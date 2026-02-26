import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { KaryawanModule } from './karyawan/karyawan.module.js';
import { PresensiModule } from './presensi/presensi.module.js';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    DashboardModule,
    KaryawanModule,
    PresensiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
