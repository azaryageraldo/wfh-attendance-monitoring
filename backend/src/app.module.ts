import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [PrismaModule, AuthModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
