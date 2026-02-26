import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { KaryawanModule } from './karyawan/karyawan.module.js';

@Module({
  imports: [PrismaModule, AuthModule, DashboardModule, KaryawanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
