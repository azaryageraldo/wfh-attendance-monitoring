import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PresensiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, photoUrl: string | null, keterangan?: string) {
    // Cek apakah user sudah absensi hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await this.prisma.presensi.findFirst({
      where: {
        userId,
        tanggal: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Anda sudah melakukan absensi hari ini');
    }

    return this.prisma.presensi.create({
      data: {
        userId,
        photoUrl,
        keterangan,
        tanggal: new Date(),
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.presensi.findMany({
      where: { userId },
      orderBy: { tanggal: 'desc' },
    });
  }

  async getTodayStatus(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const presensi = await this.prisma.presensi.findFirst({
      where: {
        userId,
        tanggal: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    return { hadir: !!presensi, data: presensi };
  }
}
