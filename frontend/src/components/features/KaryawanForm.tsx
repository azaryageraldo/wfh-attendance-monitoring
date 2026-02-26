import { useState } from 'react';
import { User, Mail, Briefcase, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card, { CardHeader } from '../ui/Card';

interface KaryawanFormProps {
  mode?: 'create' | 'edit';
  initialData?: {
    name: string;
    email: string;
    position: string;
    department: string;
  };
  onSubmit?: (data: Record<string, string>) => void;
  onBack?: () => void;
}

const positionOptions = [
  { value: 'Staff', label: 'Staff' },
  { value: 'Senior Staff', label: 'Senior Staff' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Senior Manager', label: 'Senior Manager' },
  { value: 'Director', label: 'Director' },
];

const departmentOptions = [
  { value: 'IT', label: 'IT' },
  { value: 'HR', label: 'Human Resource' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Sales', label: 'Sales' },
];

export default function KaryawanForm({
  mode = 'create',
  initialData,
  onSubmit,
  onBack,
}: KaryawanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    position: initialData?.position || '',
    department: initialData?.department || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!form.email.trim()) newErrors.email = 'Email wajib diisi';
    if (mode === 'create' && !form.password) newErrors.password = 'Password wajib diisi';
    if (!form.position) newErrors.position = 'Jabatan wajib dipilih';
    if (!form.department) newErrors.department = 'Departemen wajib dipilih';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // TODO: integrate with karyawan service
    setTimeout(() => {
      setIsLoading(false);
      onSubmit?.(form);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke daftar
        </button>
      )}

      <Card>
        <CardHeader
          title={mode === 'create' ? 'Tambah Karyawan Baru' : 'Edit Data Karyawan'}
          subtitle={
            mode === 'create'
              ? 'Isi formulir berikut untuk menambahkan karyawan baru'
              : 'Perbarui informasi data karyawan'
          }
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email"
              type="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />
          </div>

          {mode === 'create' && (
            <Input
              label="Password"
              type="password"
              placeholder="Buat password karyawan"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              helperText="Minimal 6 karakter"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="Jabatan"
              options={positionOptions}
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              error={errors.position}
            />

            <Select
              label="Departemen"
              options={departmentOptions}
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              error={errors.department}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            {onBack && (
              <Button variant="secondary" type="button" onClick={onBack}>
                Batal
              </Button>
            )}
            <Button
              type="submit"
              isLoading={isLoading}
              leftIcon={mode === 'create' ? <User className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            >
              {mode === 'create' ? 'Tambah Karyawan' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
