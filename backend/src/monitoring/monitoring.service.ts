import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { format, startOfDay, endOfDay, isValid, parseISO } from 'date-fns';

@Injectable()
export class MonitoringService {
  constructor(private readonly prisma: PrismaService) {}

  async getMonitoringData(dateStr?: string) {
    let targetDate = new Date();
    
    if (dateStr) {
      targetDate = parseISO(dateStr);
      if (!isValid(targetDate)) {
        throw new BadRequestException('Format tanggal tidak valid. Gunakan YYYY-MM-DD');
      }
    }

    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    // Get all employees
    const allEmployees = await this.prisma.user.findMany({
      where: { role: 'KARYAWAN' },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        position: true,
      },
    });

    // Get presensi on the target date
    const presensis = await this.prisma.presensi.findMany({
      where: {
        tanggal: {
          gte: start,
          lte: end,
        },
      },
      select: {
        userId: true,
        tanggal: true,
        photoUrl: true,
        keterangan: true,
      },
    });

    // Map presensi by userId for quick lookup
    const presensiMap = new Map();
    presensis.forEach((p) => {
      presensiMap.set(p.userId, p);
    });

    let totalHadir = 0;
    const totalKaryawan = allEmployees.length;

    // Build the result
    const records = allEmployees.map((emp) => {
      const p = presensiMap.get(emp.id);
      let status = 'tidak_hadir';
      let waktu = '-';

      if (p) {
        status = 'hadir'; // Since no shift logic, any presence is "hadir"
        waktu = format(new Date(p.tanggal), 'HH:mm');
        totalHadir++;
      }

      return {
        id: emp.id,
        nama: emp.name,
        email: emp.email,
        department: emp.department || '-',
        position: emp.position || '-',
        tanggal: format(targetDate, 'yyyy-MM-dd'),
        waktu,
        status,
        photoUrl: p?.photoUrl || null,
        keterangan: p?.keterangan || null,
      };
    });

    return {
      date: format(targetDate, 'yyyy-MM-dd'),
      summary: {
        totalHadir,
        totalTidakHadir: totalKaryawan - totalHadir,
        totalTerlambat: 0, // Not implemented since no fixed shift time rule
      },
      data: records,
    };
  }
}
