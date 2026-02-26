import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PresensiService } from './presensi.service.js';
import { CreatePresensiDto } from './dto/create-presensi.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { multerConfig } from './upload/multer.config.js';

@UseGuards(JwtAuthGuard)
@Controller('presensi')
export class PresensiController {
  constructor(private readonly presensiService: PresensiService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async create(
    @Req() req: any,
    @Body() createPresensiDto: CreatePresensiDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const photoUrl = file ? `/uploads/${file.filename}` : null;
    return this.presensiService.create(
      req.user.id,
      photoUrl,
      createPresensiDto.keterangan,
    );
  }

  @Get('history')
  async getHistory(@Req() req: any) {
    return this.presensiService.findByUser(req.user.id);
  }

  @Get('today')
  async getTodayStatus(@Req() req: any) {
    return this.presensiService.getTodayStatus(req.user.id);
  }
}
