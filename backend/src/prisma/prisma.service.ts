import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // Prisma V7 config loads automatically
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
