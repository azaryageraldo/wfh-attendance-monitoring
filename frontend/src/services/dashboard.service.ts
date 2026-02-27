import api from './api';

export interface DashboardHariIni {
  hadirLengkap: number;
  belumCheckout: number;
  tidakHadir: number;
}

export interface DashboardBulanIni {
  hadir: number;
  tidakHadir: number;
}

export interface DashboardStats {
  totalKaryawan: number;
  hariIni: DashboardHariIni;
  bulanIni: DashboardBulanIni;
}

export interface KaryawanDashboardPresensi {
  checkInWaktu?: string;
  checkOutWaktu?: string | null;
  status: string;
}

export interface KaryawanDashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  };
  presensi: KaryawanDashboardPresensi;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get<DashboardStats>('/dashboard/stats');
    return data;
  },
  
  getKaryawanStats: async (): Promise<KaryawanDashboardData> => {
    const { data } = await api.get<KaryawanDashboardData>('/dashboard/karyawan');
    return data;
  },
};
