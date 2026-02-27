import api from './api';

export interface MonitoringData {
  [key: string]: unknown;
  id: string;
  nama: string;
  email: string;
  department: string;
  position: string;
  checkInWaktu: string;
  waktu: string;
  status: 'hadir' | 'tidak_hadir' | 'terlambat';
  checkInPhotoUrl: string | null;
  checkInKeterangan: string | null;
  checkOutWaktu: string | null;
  checkOutPhotoUrl: string | null;
  checkOutKeterangan: string | null;
}

export interface MonitoringResponse {
  date: string;
  data: MonitoringData[];
}

export const monitoringService = {
  getMonitoring: async (date?: string): Promise<MonitoringResponse> => {
    const params = date ? { date } : {};
    const { data } = await api.get<MonitoringResponse>('/monitoring', { params });
    return data;
  },
};
