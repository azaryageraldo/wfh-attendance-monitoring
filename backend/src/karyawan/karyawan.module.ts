import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service.js';
import { KaryawanController } from './karyawan.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [KaryawanController],
  providers: [KaryawanService],
})
export class KaryawanModule {}
