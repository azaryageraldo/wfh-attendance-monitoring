import api from './api';

export interface MonitoringData {
  [key: string]: unknown;
  id: string;
  nama: string;
  email: string;
  department: string;
  position: string;
  tanggal: string;
  waktu: string;
  status: 'hadir' | 'tidak_hadir' | 'terlambat';
  photoUrl: string | null;
  keterangan: string | null;
}

export interface MonitoringSummary {
  totalHadir: number;
  totalTidakHadir: number;
  totalTerlambat: number;
}

export interface MonitoringResponse {
  date: string;
  summary: MonitoringSummary;
  data: MonitoringData[];
}

export const monitoringService = {
  getMonitoring: async (date?: string): Promise<MonitoringResponse> => {
    const params = date ? { date } : {};
    const { data } = await api.get<MonitoringResponse>('/monitoring', { params });
    return data;
  },
};
