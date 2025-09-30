import { isDevelopment } from '@/src/common/utils/is-environment.util';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { withAccelerate } from '@prisma/extension-accelerate';
import { withOptimize } from '@prisma/extension-optimize';
import settings from 'src/common/config/index';
import { PrismaClient } from 'src/generated/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly prisma: ReturnType<(typeof PrismaService)['createPrismaClient']>;

  constructor() {
    this.prisma = PrismaService.createPrismaClient();
  }

  private static createPrismaClient() {
    const isDev = isDevelopment();

    let client = new PrismaClient({
      log: isDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
      errorFormat: 'pretty',
      datasourceUrl: settings.DATABASE_URL!,
      omit: {
        user: {
          password: true,
          lastLogin: true,
        },
      },
    });

    const optimizeApiKey = settings.OPTIMIZE_API_KEY;
    if (isDev && optimizeApiKey) {
      type ClientType = typeof client;
      client = client.$extends(withOptimize({ apiKey: optimizeApiKey })) as ClientType;
    }

    return client.$extends(withAccelerate());
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
