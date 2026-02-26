import { PartialType } from '@nestjs/mapped-types';
import { CreateKaryawanDto } from './create-karyawan.dto.js';

export class UpdateKaryawanDto extends PartialType(CreateKaryawanDto) {}
