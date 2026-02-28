# WFH Attendance Monitoring System

Sebuah sistem absensi berbasis web dengan pendekatan lokasi kerja fleksibel (Work From Home) yang dibangun menggunakan arsitektur modern untuk _HR Admin_ dan _Karyawan_. Proyek ini diciptakan khusus untuk memenuhi kebutuhan _Technical Test_.

---

## 🚀 Tech Stack

**Backend**

- **NestJS** (Kerangka kerja Node.js modular & terstruktur)
- **TypeScript** (Pengetikan statis yang kuat)
- **Prisma ORM** (Object-Relational Mapping generasi baru)
- **MySQL** (Sistem Manajemen Basis Data Relasional)
- **JWT Authentication** (Autentikasi sesi yang aman)

**Frontend**

- **React** (Library UI component-based)
- **TypeScript** (Keamanan tipe pada antarmuka)
- **Vite** (Build tool dan dev server ultra-cepat)
- **Tailwind CSS** (Utility-first CSS framework untuk styling cepat & estetik)

---

## ✨ Fitur Utama

**Bagi Karyawan:**

- 🛡️ Autentikasi aman melalui JWT Login.
- 🏠 Dashboard interaktif dengan ringkasan status presensi hari berjalan.
- 📸 Fitur Absen (_Check-in_ & _Check-out_) dengan wajib melampirkan foto/kamera (disimpan secara lokal) & catatan.
- 📜 Histori Log Presensi harian pribadi.

**Bagi HR Admin:**

- 🛡️ Proteksi hak akses via `RolesGuard` NestJS.
- 📊 Dashboard Analitik yang menghitung tingkat kehadiran, jumlah karyawan, dan statistik bulan berjalan.
- 👥 Manajemen Karyawan (CRUD penuh: Tambah, Edit, Hapus data/divisi anggota).
- 👁️ Real-time _Monitoring_ daftar absensi harian secara global (memantau waktu masuk, absen keluar, keterangan, validasi bukti foto, hingga mendata pegawai yang "Tidak Hadir").

---

## 🗄️ Database Design

Sistem ini menggunakan arsitektur _One-to-Many_ yang dioptimalkan dengan metode penghapusan _Cascade_ (`onDelete: Cascade`) demi menjaga integritas data.

### Diagram Relasi:

`User` (1) ───mempunyai───> (\*) `Presensi`

### Detail Entitas:

1. **User Table (`Role: ADMIN_HR | KARYAWAN`)**
   Menyimpan profil akun.
   - `id` (UUID, Primary Key)
   - `name`, `email`, `password` (Credentials)
   - `role` (Hak Akses)
   - `position`, `department` (Informasi Perusahaan)

2. **Presensi Table**
   Menyimpan jejak waktu (Timestamp) masing-masing user per harinya.
   - `id` (UUID, Primary Key)
   - `userId` (Foreign Key merujuk ke tabel `User`)
   - `checkInWaktu`, `checkInPhotoUrl`, `checkInKeterangan` (Data masuk)
   - `checkOutWaktu`, `checkOutPhotoUrl`, `checkOutKeterangan` (Data pulang)
     _(Tabel ini diindeks berdasarkan Tanggal dan Relasi User demi kecepatan kueri monitoring bulanan)_

---

## 📂 Struktur Folder Proyek

Repositori dipecah ke dalam dua ranah inti (Monorepo-style):

```text
├── backend/                       # Server NestJS
│   ├── prisma/                    # Schema database Prisma (.prisma)
│   ├── public/uploads/            # Tempat penyimpanan gambar dinamis absensi
│   ├── src/
│   │   ├── auth/                  # Modul login & JWT strategy
│   │   ├── dashboard/             # Modul perhitungan analitik HR & User
│   │   ├── karyawan/              # Modul CRUD Master Karyawan
│   │   ├── monitoring/            # Modul Query daftar kehadiran (View-Only)
│   │   ├── presensi/              # Modul logic Input/Checkout absen
│   │   ├── common/                # Shared utilities, Auth Guards, Roles, Ext Filters
│   │   └── main.ts                # Entry point & setup CORS server Node
│   └── package.json
│
└── frontend/                      # Web SPA React + Vite
    ├── public/documentation/      # Aset gambar & logo dokumentasi
    ├── src/
    │   ├── components/            # Reusable UI Parts (Button, Card, Modal, Table dll)
    │   ├── context/               # Global state (AuthContext.tsx)
    │   ├── hooks/                 # Custom React Hooks
    │   ├── pages/                 # Struktur Halaman Utama (Login, Beranda, History)
    │   ├── services/              # Integrasi komunikasi Axios HTTP Client ke API (/backend)
    │   └── App.tsx                # Sistem Routing & RBAC Wrapper (react-router-dom)
    └── package.json
```

---

## 💻 Cara Install & Setup

Pastikan sistem operasi Anda memiliki **Node.js (v18+)** dan Service **MySQL Server** yang sedang berjalan.

### 1. Kloning Repositori

```bash
git clone https://github.com/azaryageraldo/wfh-attendance-monitoring.git
cd wfh-attendance-monitoring
```

### 2. Konfigurasi Database & Backend

1. Masuk ke folder backend: `cd backend`
2. Instal dependensi: `npm install`
3. Buat duplikat `.env.example` ke `.env` lalu sesuaikan kredensial MySQL.
   ```env
   DATABASE_URL="mysql://root:password_anda@localhost:3306/wfh_attendance"
   JWT_SECRET="secret_super_kuat"
   ```
4. Jalankan migrasi dan hasilkan skema: `npx prisma db push` (Opsional/Jika diminta: `npx prisma generate`)
5. Jalankan backend: `npm run start:dev` (Server aktif di port 3000)

### 3. Konfigurasi Frontend

1. Buka terminal baru dan masuk ke folder frontend: `cd frontend`
2. Instal dependensi: `npm install`
3. Jalankan web lokal: `npm run dev`
4. Buka Browser dan kunjungi _URL_ (biasanya `http://localhost:5173`).

_(Catatan: Anda mungkin perlu registrasi awal manual via Seeder atau POST API untuk memiliki akun ADMIN_HR yang aktif)_

---

## 📷 Screenshots Tampilan Website

_Galeri antarmuka sistem yang berorientasi pada modernitas, konsistensi warna (Light Mode), dan kemudahan pengguna._

### 1. Halaman Autentikasi (Login)

![Login Screen](/documentation/login.png)

### 2. Panel Karyawan: Status Absensi Hari Ini

![Personal Dashboard](/documentation/dashboardkaryawan.png)

### 3. Panel Karyawan: Form Pengisian Presensi (Upload Foto)

![Absensi Form](/documentation/formpresensi.png)

### 4. Panel Karyawan: Riwayat Absensi

![Riwayat Transaksi Pribadi](/documentation/riwayatpresensi.png)

### 5. Dasbor Admin (HR Analytics)

![HR Master Dashboard](/documentation/admindashboard.png)

### 6. Admin Panel: Master Karyawan

![Mengelola Data Pegawai](/documentation/matsterkaryawan.png)

### 7. Admin Panel: Tabel Monitoring Harian

![Pengintaian Absen Pegawai](/documentation/monitoring.png)
