import api from './api';

export type Presensi = {
  id: string;
  userId: string;
  checkInWaktu: string;
  checkInPhotoUrl: string | null;
  checkInKeterangan: string | null;
  checkOutWaktu: string | null;
  checkOutPhotoUrl: string | null;
  checkOutKeterangan: string | null;
  createdAt: string;
};

export type TodayStatus = {
  hadir: boolean;
  isCheckout?: boolean;
  status?: string;
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
    const { data } = await api.get('/presensi/today');
    return data;
  },

  submitCheckout: async (formData: FormData) => {
    const { data } = await api.post('/presensi/checkout', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
