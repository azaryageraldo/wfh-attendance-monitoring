import { useState } from 'react';
import { Search, Download, Eye, X, Image as ImageIcon } from 'lucide-react';
import Table, { type Column } from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import Input from '../ui/Input';
import type { MonitoringData, MonitoringSummary } from '../../services/monitoring.service';

interface MonitoringTableProps {
  summary: MonitoringSummary;
  records: MonitoringData[];
}

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

export default function MonitoringTable({ summary, records }: MonitoringTableProps) {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<MonitoringData | null>(null);

  const filtered = records.filter((row) => {
    const matchSearch =
      row.nama.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || row.department === filterDept;
    return matchSearch && matchDept;
  });

  const columns: Column<MonitoringData>[] = [
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
      header: 'Departemen & Posisi',
      sortable: true,
      render: (row) => (
        <div>
          <p className="text-sm text-slate-700">{row.department}</p>
          <p className="text-xs text-slate-500">{row.position}</p>
        </div>
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
      render: (row) => (
        <button
          onClick={() => setSelectedRecord(row)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={row.status === 'tidak_hadir'}
          title="Detail Presensi"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const handleExport = () => {
    // Generate simple CSV
    let csv = 'Nama,Email,Departemen,Posisi,Waktu,Status,Keterangan\n';
    filtered.forEach((row) => {
      csv += `"${row.nama}","${row.email}","${row.department}","${row.position}","${row.waktu}","${row.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}","${row.keterangan || ''}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monitoring_Absensi_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Get unique departments for filter dropdown
  const uniqueDepts = Array.from(new Set(records.map(r => r.department).filter(d => d !== '-')));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 sm:p-5 border border-emerald-100">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Hadir</p>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">{summary.totalHadir}</p>
          <p className="text-xs text-emerald-500 mt-1">karyawan</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-4 sm:p-5 border border-red-100">
          <p className="text-xs font-medium text-red-600 uppercase tracking-wider">Belum / Tidak Hadir</p>
          <p className="text-2xl sm:text-3xl font-bold text-red-700 mt-1">{summary.totalTidakHadir}</p>
          <p className="text-xs text-red-500 mt-1">karyawan</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 sm:p-5 border border-blue-100 hidden lg:block">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Total Karyawan</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">{records.length}</p>
          <p className="text-xs text-blue-500 mt-1">terdaftar</p>
        </div>
      </div>

      {/* Table Card */}
      <Card padding="none">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <CardHeader
            title="Data Absensi Karyawan"
            subtitle="Daftar kehadiran seluruh karyawan di hari ini"
            action={
              <Button onClick={handleExport} variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export CSV
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
            <div className="flex gap-2 min-w-[150px]">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Semua Dept.</option>
                {uniqueDepts.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={columns} data={filtered} emptyMessage="Tidak ada data ditemukan" />
        </div>
      </Card>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-6 text-center border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">{selectedRecord.nama}</h3>
              <p className="text-sm text-slate-500">{selectedRecord.department} — {selectedRecord.position}</p>
            </div>
            
            <div className="p-6 bg-slate-50">
              {selectedRecord.photoUrl ? (
                <div className="mb-5 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-white">
                  <img
                    src={`http://localhost:3000${selectedRecord.photoUrl}`}
                    alt={`Bukti WFH - ${selectedRecord.nama}`}
                    className="w-full object-cover max-h-[300px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found';
                    }}
                  />
                </div>
              ) : (
                <div className="h-40 bg-slate-200 rounded-xl flex items-center justify-center mb-5 border border-slate-300 border-dashed">
                  <div className="text-center text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Tidak ada foto</p>
                  </div>
                </div>
              )}

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Waktu Presensi</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.waktu} WIB</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                  <span className="text-slate-500">Keterangan</span>
                  <span className="text-slate-800 font-medium text-right max-w-[200px] truncate" title={selectedRecord.keterangan || '-'}>
                    {selectedRecord.keterangan || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
