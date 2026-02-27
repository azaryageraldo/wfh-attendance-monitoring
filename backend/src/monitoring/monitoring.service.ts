import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { format, startOfDay, endOfDay, isValid, parseISO } from 'date-fns';

@Injectable()
export class MonitoringService {
  constructor(private readonly prisma: PrismaService) {}

  async getMonitoringData(dateStr?: string) {
    try {
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
          checkInWaktu: {
            gte: start,
            lte: end,
          },
        },
        select: {
          userId: true,
          checkInWaktu: true,
          checkInPhotoUrl: true,
          checkInKeterangan: true,
          checkOutWaktu: true,
          checkOutPhotoUrl: true,
          checkOutKeterangan: true,
        },
      });

      // Map presensi by userId for quick lookup
      const presensiMap = new Map();
      presensis.forEach((p) => {
        presensiMap.set(p.userId, p);
      });

      // Build the result
      const records = allEmployees.map((emp) => {
        const p = presensiMap.get(emp.id);
        let status = 'Tidak Hadir';
        let waktu = '-';

        if (p) {
          if (p.checkOutWaktu) {
            status = 'Hadir (Selesai)';
          } else {
            status = 'Hadir (Belum Checkout)';
          }
          waktu = format(new Date(p.checkInWaktu), 'HH:mm');
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
          checkInPhotoUrl: p?.checkInPhotoUrl || null,
          checkInKeterangan: p?.checkInKeterangan || null,
          checkOutWaktu: p?.checkOutWaktu ? format(new Date(p.checkOutWaktu), 'HH:mm') : null,
          checkOutPhotoUrl: p?.checkOutPhotoUrl || null,
          checkOutKeterangan: p?.checkOutKeterangan || null,
        };
      });

      return {
        date: format(targetDate, 'yyyy-MM-dd'),
        data: records,
      };
    } catch (error) {
      console.error('ERROR in getMonitoringData:', error);
      throw error;
    }
  }
}
