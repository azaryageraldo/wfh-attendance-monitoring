import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto.js';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class KaryawanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKaryawanDto: CreateKaryawanDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createKaryawanDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email karyawan sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(
      createKaryawanDto.password || 'password123',
      10,
    );

    const user = await this.prisma.user.create({
      data: {
        name: createKaryawanDto.name,
        email: createKaryawanDto.email,
        password: hashedPassword,
        position: createKaryawanDto.position,
        department: createKaryawanDto.department,
        role: 'KARYAWAN',
      },
    });

    const { password: _, ...result } = user;
    return result;
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        role: 'KARYAWAN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        department: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, role: 'KARYAWAN' },
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        department: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Karyawan dengan ID ${id} tidak ditemukan`);
    }

    return user;
  }

  async update(id: string, updateKaryawanDto: UpdateKaryawanDto) {
    await this.findOne(id); // verifikasi ada

    let updateData: any = { ...updateKaryawanDto };
    
    // Cegah edit role melalui endpoint update karyawan
    delete updateData.role;

    // Jika password diatur ulang oleh admin
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
        delete updateData.password; // jika string kosong biarkan password lama
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    const { password: _, ...result } = updatedUser;
    return result;
  }

  async remove(id: string) {
    await this.findOne(id); // pastikan ada
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
