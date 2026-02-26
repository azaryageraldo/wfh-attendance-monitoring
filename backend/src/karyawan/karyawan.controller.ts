import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { KaryawanService } from './karyawan.service.js';
import { CreateKaryawanDto } from './dto/create-karyawan.dto.js';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN_HR) // Seluruh endpoint KPI Karyawan khusus Admin HR
@Controller('karyawan')
export class KaryawanController {
  constructor(private readonly karyawanService: KaryawanService) {}

  @Post()
  create(@Body() createKaryawanDto: CreateKaryawanDto) {
    return this.karyawanService.create(createKaryawanDto);
  }

  @Get()
  findAll() {
    return this.karyawanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.karyawanService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKaryawanDto: UpdateKaryawanDto,
  ) {
    return this.karyawanService.update(id, updateKaryawanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.karyawanService.remove(id);
  }
}
