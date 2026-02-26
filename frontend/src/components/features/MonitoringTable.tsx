import { useState } from 'react';
import { Search, Download, Eye, Calendar } from 'lucide-react';
import Table, { type Column } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import Input from '../ui/Input';

interface PresensiRecord {
  [key: string]: unknown;
  id: string;
  nama: string;
  email: string;
  department: string;
  tanggal: string;
  waktu: string;
  status: 'hadir' | 'tidak_hadir' | 'terlambat';
  photoUrl: string | null;
}

// Demo data
const demoData: PresensiRecord[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    email: 'budi@email.com',
    department: 'IT',
    tanggal: '2026-02-27',
    waktu: '08:05',
    status: 'hadir',
    photoUrl: null,
  },
  {
    id: '2',
    nama: 'Siti Rahayu',
    email: 'siti@email.com',
    department: 'HR',
    tanggal: '2026-02-27',
    waktu: '09:15',
    status: 'terlambat',
    photoUrl: null,
  },
  {
    id: '3',
    nama: 'Ahmad Fadli',
    email: 'ahmad@email.com',
    department: 'Finance',
    tanggal: '2026-02-27',
    waktu: '-',
    status: 'tidak_hadir',
    photoUrl: null,
  },
  {
    id: '4',
    nama: 'Dewi Lestari',
    email: 'dewi@email.com',
    department: 'Marketing',
    tanggal: '2026-02-27',
    waktu: '07:55',
    status: 'hadir',
    photoUrl: null,
  },
  {
    id: '5',
    nama: 'Riko Pratama',
    email: 'riko@email.com',
    department: 'Operations',
    tanggal: '2026-02-27',
    waktu: '08:00',
    status: 'hadir',
    photoUrl: null,
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'hadir':
      return <Badge variant="success" dot>Hadir</Badge>;
    case 'terlambat':
      return <Badge variant="warning" dot>Terlambat</Badge>;
    case 'tidak_hadir':
      return <Badge variant="danger" dot>Tidak Hadir</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};

export default function MonitoringTable() {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const filtered = demoData.filter((row) => {
    const matchSearch =
      row.nama.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || row.department === filterDept;
    return matchSearch && matchDept;
  });

  const columns: Column<PresensiRecord>[] = [
    {
      key: 'nama',
      header: 'Karyawan',
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800">{row.nama}</p>
          <p className="text-xs text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Departemen',
      sortable: true,
    },
    {
      key: 'tanggal',
      header: 'Tanggal',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600">{row.tanggal}</span>
      ),
    },
    {
      key: 'waktu',
      header: 'Waktu Masuk',
      render: (row) => (
        <span className={`font-mono text-sm ${row.waktu === '-' ? 'text-slate-300' : 'text-slate-700'}`}>
          {row.waktu}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => statusBadge(row.status),
    },
    {
      key: 'action',
      header: '',
      className: 'w-12',
      render: () => (
        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  // Summary cards
  const totalHadir = demoData.filter((d) => d.status === 'hadir').length;
  const totalTerlambat = demoData.filter((d) => d.status === 'terlambat').length;
  const totalTidakHadir = demoData.filter((d) => d.status === 'tidak_hadir').length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-5 border border-emerald-100">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Hadir</p>
          <p className="text-3xl font-bold text-emerald-700 mt-1">{totalHadir}</p>
          <p className="text-xs text-emerald-500 mt-1">karyawan hari ini</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-5 border border-amber-100">
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">Terlambat</p>
          <p className="text-3xl font-bold text-amber-700 mt-1">{totalTerlambat}</p>
          <p className="text-xs text-amber-500 mt-1">karyawan hari ini</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-5 border border-red-100">
          <p className="text-xs font-medium text-red-600 uppercase tracking-wider">Tidak Hadir</p>
          <p className="text-3xl font-bold text-red-700 mt-1">{totalTidakHadir}</p>
          <p className="text-xs text-red-500 mt-1">karyawan hari ini</p>
        </div>
      </div>

      {/* Table Card */}
      <Card padding="none">
        <div className="p-5 border-b border-slate-100">
          <CardHeader
            title="Data Absensi Karyawan"
            subtitle="Monitoring kehadiran WFH seluruh karyawan"
            action={
              <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export
              </Button>
            }
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 appearance-none pr-8 cursor-pointer"
              >
                <option value="">Semua Dept.</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>
              <Button variant="ghost" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
                Hari Ini
              </Button>
            </div>
          </div>
        </div>

        <Table columns={columns} data={filtered} emptyMessage="Belum ada data absensi" />
      </Card>
    </div>
  );
}
