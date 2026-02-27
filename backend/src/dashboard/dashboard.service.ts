import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { startOfDay, endOfDay, startOfMonth } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);
    const startMonth = startOfMonth(today);

    const totalKaryawan = await this.prisma.user.count({
      where: { role: 'KARYAWAN' },
    });

    const hadirLengkap = await this.prisma.presensi.count({
      where: {
        checkInWaktu: { gte: start, lte: end },
        checkOutWaktu: { not: null },
      },
    });

    const belumCheckout = await this.prisma.presensi.count({
      where: {
        checkInWaktu: { gte: start, lte: end },
        checkOutWaktu: null,
      },
    });

    const totalHadirHariIni = hadirLengkap + belumCheckout;
    const tidakHadirHariIni = Math.max(0, totalKaryawan - totalHadirHariIni);

    const totalHadirBulanIni = await this.prisma.presensi.count({
      where: {
        checkInWaktu: { gte: startMonth, lte: end },
      },
    });

    const daysPassed = today.getDate(); // 1-31
    const totalExpectedBulanIni = totalKaryawan * daysPassed;
    const tidakHadirBulanIni = Math.max(0, totalExpectedBulanIni - totalHadirBulanIni);

    return {
      totalKaryawan,
      hariIni: {
        hadirLengkap,
        belumCheckout,
        tidakHadir: tidakHadirHariIni,
      },
      bulanIni: {
        hadir: totalHadirBulanIni,
        tidakHadir: tidakHadirBulanIni,
      }
    };
  }

  async getKaryawanDashboard(userId: string) {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        position: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const presensiToday = await this.prisma.presensi.findFirst({
      where: {
        userId: userId,
        checkInWaktu: { gte: start, lte: end },
      },
    });

    let status = 'Tidak Hadir';
    if (presensiToday) {
      status = presensiToday.checkOutWaktu ? 'Hadir (Selesai)' : 'Hadir (Belum Checkout)';
    }

    return {
      user,
      presensi: presensiToday ? {
        checkInWaktu: presensiToday.checkInWaktu,
        checkOutWaktu: presensiToday.checkOutWaktu,
        status,
      } : {
        status,
      }
    };
  }
}
