import api from './api';

export type Karyawan = {
  id: string;
  name: string;
  email: string;
  position: string | null;
  department: string | null;
  createdAt: string;
};

export type CreateKaryawanDto = {
  name: string;
  email: string;
  password?: string;
  position?: string;
  department?: string;
};

export type UpdateKaryawanDto = Partial<CreateKaryawanDto>;

export const karyawanService = {
  getAll: async (): Promise<Karyawan[]> => {
    const response = await api.get('/karyawan');
    return response.data;
  },

  getById: async (id: string): Promise<Karyawan> => {
    const response = await api.get(`/karyawan/${id}`);
    return response.data;
  },

  create: async (data: CreateKaryawanDto): Promise<Karyawan> => {
    const response = await api.post('/karyawan', data);
    return response.data;
  },

  update: async (id: string, data: UpdateKaryawanDto): Promise<Karyawan> => {
    const response = await api.patch(`/karyawan/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/karyawan/${id}`);
  },
};
