import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import { BadRequestException, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationError, useContainer } from 'class-validator';
import dayjs from 'dayjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { performance } from 'perf_hooks';
import { AppModule } from './app.module';
import settings from './common/config/index';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { isProduction } from './common/utils/is-environment.util';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const startTime = performance.now();
  const isProd = isProduction();

  try {
    const fastifyAdapter = createOptimizedFastifyAdapter(isProd);
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
      logger: isProd ? ['error', 'warn'] : ['log', 'debug', 'error', 'verbose', 'warn'],
      abortOnError: isProd,
      forceCloseConnections: true,
    });

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    setupGlobalPipes(app, isProd);
    setupGlobalFilters(app);
    setupCors(app, isProd);
    setupVersioning(app);
    await Promise.all([setupSecurity(app, isProd), setupCompression(app, isProd)]);

    setupGracefulShutdown(app, logger);

    const port = Number(settings.PORT) || 3000;
    const host = '0.0.0.0';

    await app.listen(port, host);

    const bootTime = Math.round(performance.now() - startTime);

    logger.log(`🚀 Application started successfully!`);
    logger.log(`📍 Server running on: http://${host}:${port}`);
    logger.log(`🌍 Environment: ${settings.NODE_ENV}`);
    logger.log(`⚡ Boot time: ${bootTime}ms`);
    logger.log(`💾 Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  } catch (error) {
    logger.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

function createOptimizedFastifyAdapter(isProd: boolean): FastifyAdapter {
  return new FastifyAdapter({
    trustProxy: true,
    logger: isProd
      ? false
      : {
          level: 'info',
        },
    caseSensitive: false,
    ignoreTrailingSlash: true,
    maxParamLength: 100,
    keepAliveTimeout: 72000,
    requestTimeout: 30000,
    bodyLimit: 10 * 1024 * 1024,
    connectionTimeout: 0,
    pluginTimeout: 30000,
    serializerOpts: {
      schema: {},
    },
    clientErrorHandler: (error: any, socket: any) => {
      const logger = new Logger('ClientError');
      logger.error('Client connection error:', error.message);
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    },
  });
}

function setupGlobalPipes(app: NestFastifyApplication, isProd: boolean): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: isProd,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const formattedErrors = formatValidationErrors(validationErrors);
        return new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
          timestamp: dayjs().format(),
        });
      },
      stopAtFirstError: isProd,
    }),
  );
}

function setupGlobalFilters(app: NestFastifyApplication): void {
  const winstonLogger = app.get(WINSTON_MODULE_PROVIDER);
  app.useGlobalFilters(new HttpExceptionFilter(winstonLogger));
}

async function setupSecurity(app: NestFastifyApplication, isProd: boolean): Promise<void> {
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: isProd ? ["'self'"] : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      },
    },
    crossOriginEmbedderPolicy: isProd,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    frameguard: { action: 'deny' },
    xssFilter: true,
  });
}

async function setupCompression(app: NestFastifyApplication, isProd: boolean): Promise<void> {
  await app.register(compress, {
    global: true,
    threshold: 1024,
    encodings: ['gzip', 'deflate', 'br'],
    zlibOptions: {
      level: isProd ? 6 : 1,
    },
  });
}

function setupCors(app: NestFastifyApplication, isProd: boolean): void {
  const allowedOrigins = isProd
    ? [settings.FRONTEND_URL].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', settings.FRONTEND_URL].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (!isProd && /localhost|127\.0\.0\.1/.test(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  });
}

function setupVersioning(app: NestFastifyApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
  app.setGlobalPrefix('api');
}

function setupGracefulShutdown(app: NestFastifyApplication, logger: Logger) {
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.warn(`Received ${signal}, shutting down gracefully...`);
      await app.close();
      logger.log('Application shutdown complete');
      process.exit(0);
    });
  });
}

function formatValidationErrors(errors: ValidationError[]) {
  return errors.map(err => ({
    field: err.property,
    errors: Object.values(err.constraints || {}),
  }));
}

bootstrap();
