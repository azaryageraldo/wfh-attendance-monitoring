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
        checkInWaktu: {
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
        checkInPhotoUrl: photoUrl,
        checkInKeterangan: keterangan,
        checkInWaktu: new Date(),
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.presensi.findMany({
      where: { userId },
      orderBy: { checkInWaktu: 'desc' },
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
        checkInWaktu: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    let statusString = 'Belum Absen';
    if (presensi) {
      statusString = presensi.checkOutWaktu ? 'Hadir (Selesai)' : 'Hadir (Belum Checkout)';
    }

    return { hadir: !!presensi, isCheckout: !!presensi?.checkOutWaktu, status: statusString, data: presensi };
  }

  async checkout(userId: string, photoUrl: string | null, keterangan?: string) {
    // Cari absensi hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await this.prisma.presensi.findFirst({
      where: {
        userId,
        checkInWaktu: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (!existing) {
      throw new ConflictException('Anda belum melakukan absensi masuk (check-in) hari ini');
    }

    if (existing.checkOutWaktu) {
      throw new ConflictException('Anda sudah melakukan absensi pulang (check-out) hari ini');
    }

    // Lakukan update untuk checkout
    return this.prisma.presensi.update({
      where: { id: existing.id },
      data: {
        checkOutWaktu: new Date(),
        checkOutPhotoUrl: photoUrl,
        checkOutKeterangan: keterangan,
      },
    });
  }
}
