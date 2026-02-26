import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Mail, User, Lock } from 'lucide-react';
import type { CreateKaryawanDto } from '../../services/karyawan.service';

const departmentOptions = [
  { value: 'IT', label: 'IT / Technology' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance & Accounting' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Legal', label: 'Legal' },
  { value: 'GA', label: 'General Affairs' },
];

const positionOptions = [
  { value: 'Staff', label: 'Staff' },
  { value: 'Senior Staff', label: 'Senior Staff' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'Assistant Manager', label: 'Assistant Manager' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Senior Manager', label: 'Senior Manager' },
  { value: 'Director', label: 'Director' },
];

interface KaryawanFormProps {
  initialData?: Partial<CreateKaryawanDto>;
  onSubmit: (data: CreateKaryawanDto) => Promise<void>;
  isLoading: boolean;
  isEdit?: boolean;
}

export default function KaryawanForm({
  initialData,
  onSubmit,
  isLoading,
  isEdit = false,
}: KaryawanFormProps) {
  const [form, setForm] = useState<CreateKaryawanDto>({
    name: '',
    email: '',
    password: '',
    department: '',
    position: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = 'Nama lengkap wajib diisi';
    if (!form.email) newErrors.email = 'Email wajib diisi';
    if (!isEdit && !form.password) newErrors.password = 'Password wajib diisi untuk karyawan baru';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          leftIcon={<User className="w-4 h-4" />}
        />

        <Input
          label="Alamat Email"
          type="email"
          placeholder="contoh@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        <Select
          label="Departemen / Divisi"
          placeholder="Pilih departemen..."
          options={departmentOptions}
          value={form.department || ''}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <Select
          label="Posisi / Jabatan"
          placeholder="Pilih jabatan..."
          options={positionOptions}
          value={form.position || ''}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        
        <div className="md:col-span-2">
          <Input
            label={isEdit ? "Password Baru (Opsional)" : "Password Akun"}
            type="text"
            placeholder={isEdit ? "Kosongkan jika tak ingin mengganti" : "Buat password login..."}
            value={form.password || ''}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            helperText={isEdit ? "Biarkan kosong jika tetap menggunakan password yang lama." : "Minimal 6 karakter sangat disarankan."}
            leftIcon={<Lock className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Button
          type="submit"
          isLoading={isLoading}
          size="lg"
          className="w-full sm:w-auto px-8"
        >
          {isEdit ? 'Simpan Perubahan' : 'Daftarkan Karyawan'}
        </Button>
      </div>
    </form>
  );
}
