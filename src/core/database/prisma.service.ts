import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { withAccelerate } from '@prisma/extension-accelerate';
import { withOptimize } from '@prisma/extension-optimize';
import settings from 'src/common/config/configurations';
import { NodeEnv } from 'src/common/config/node.env';
import { PrismaClient } from 'src/generated/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly prisma: ReturnType<typeof PrismaService['createPrismaClient']>;

  constructor() {
    this.prisma = PrismaService.createPrismaClient();
  }

  private static createPrismaClient() {
    const isDev = settings.NODE_ENV === NodeEnv.DEV;

    let client = new PrismaClient({
      log: isDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
      errorFormat: 'pretty',
      datasourceUrl: settings.DATABASE_URL,
      omit: {
        user: {
          password: true,
          lastLogin: true,
        },
      },
    });

    type clientType = typeof client;

    if (isDev) {
      client = client.$extends(withOptimize({ apiKey: settings.OPTIMIZE_API_KEY! })) as clientType;
    }

    return client.$extends(withAccelerate());
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get client() {
    return this.prisma;
  }
}
