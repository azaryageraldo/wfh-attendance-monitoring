import { Module } from '@nestjs/common';
import { PresensiService } from './presensi.service.js';
import { PresensiController } from './presensi.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PresensiController],
  providers: [PresensiService],
})
export class PresensiModule {}
