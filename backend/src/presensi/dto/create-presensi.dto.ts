import { IsString, IsOptional } from 'class-validator';

export class CreatePresensiDto {
  @IsString()
  @IsOptional()
  keterangan?: string;
}

export class CreateCheckoutDto {
  @IsString()
  @IsOptional()
  keterangan?: string;
}
