import api from './api';

export type Presensi = {
  id: string;
  userId: string;
  tanggal: string;
  photoUrl: string | null;
  keterangan: string | null;
  createdAt: string;
};

export type TodayStatus = {
  hadir: boolean;
  data: Presensi | null;
};

export const presensiService = {
  submit: async (formData: FormData): Promise<Presensi> => {
    const response = await api.post('/presensi', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getHistory: async (): Promise<Presensi[]> => {
    const response = await api.get('/presensi/history');
    return response.data;
  },

  getTodayStatus: async (): Promise<TodayStatus> => {
    const response = await api.get('/presensi/today');
    return response.data;
  },
};
