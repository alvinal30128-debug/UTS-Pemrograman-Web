# 📚 BukuKu – Aplikasi Web Pemesanan Buku

Tugas UTS Pemrograman Web 1

| | |
|---|---|
| **Nama** | Alvin Al Aziz |
| **NIM** | 31510044 |
| **Kelas / Prodi** | I252A/Teknik Informatika |
| **Dosen Pengampu** | Agung Nugroho S.kom, M.kom |

## 🎥 Video Penjelasan

▶️ **Link YouTube:** [PASTE LINK YOUTUBE DI SINI]

---

## 📖 Tentang Project

BukuKu adalah aplikasi web sederhana untuk pemesanan buku pada toko online. Project ini berfokus pada sisi **front-end** menggunakan HTML, CSS, dan JavaScript murni. Data tidak diambil dari server atau database, melainkan dari file `js/data.js` yang berisi array dan objek JSON.

### Fitur utama
| Halaman | File | Fitur |
|---|---|---|
| Login | `index.html` | Validasi email dan password, alert jika salah, modal *Lupa Password* dan *Daftar* |
| Dashboard | `dashboard.html` | Sapaan otomatis (pagi/siang/sore/malam) sesuai jam lokal, menu navigasi |
| Stok / Katalog | `stok.html` | Tabel dinamis dari `dataKatalogBuku`, tambah baris stok lewat DOM, hapus baris, validasi form |
| Pemesanan | `checkout.html` | Keranjang (tambah, ubah jumlah, hapus), total otomatis, form pemesan dan pembayaran, riwayat transaksi |
| Tracking | `tracking.html` | Cari Nomor Delivery Order, progress bar status, detail ekspedisi, dan riwayat perjalanan paket |

### Kreativitas tambahan
- Mode siang dan malam (pilihan tersimpan di `localStorage`)
- Pendaftaran akun baru lewat modal (disimpan di `localStorage`)
- Proteksi halaman: pengguna yang belum login diarahkan ke halaman login
- Riwayat transaksi, dan pesanan baru langsung bisa dilacak di halaman tracking
- Tampilan responsif (HP dan desktop)

---

## 🗂️ Struktur Folder

```
tugas-uts-web1/
|-- index.html        (halaman login)
|-- dashboard.html
|-- stok.html
|-- checkout.html
|-- tracking.html
|-- css/
|   |-- style.css
|-- js/
|   |-- script.js     (logika semua halaman)
|   |-- data.js       (data dummy)
|-- assets/           (logo, opsional)
|-- img/              (cover buku)
|-- screenshots/      (tangkapan layar untuk README)
|-- README.md
```

## ▶️ Cara Menjalankan

1. Ekstrak folder project.
2. Buka `index.html` di browser (Chrome, Edge, atau Firefox). Tidak perlu server.
3. Login memakai akun dari `data.js`, contoh:
   - Email: `rina@gmail.com` | Password: `rina123`
4. Nomor DO untuk uji tracking: `20230012` atau `20230013`.

---

## 🧠 Penjelasan Teknis

### 1. HTML semantik
Setiap halaman memakai `<header>`, `<nav>`, `<main>`, `<section>`, dan `<footer>`. Form memakai `<label for>` yang terhubung ke `<input id>`. Tabel memakai `<thead>` dan `<tbody>`. Modal dan pesan error memakai atribut `role` dan `aria-live` agar aksesibel.

### 2. CSS (inline, internal, external)
- **External:** `css/style.css`, dipakai semua halaman.
- **Internal:** tag `<style>` di `index.html` (bayangan kartu login).
- **Inline:** atribut `style` pada beberapa elemen.
- Warna disimpan sebagai CSS variable di `:root`. Mode malam cukup mengganti variabel lewat atribut `data-tema`. Layout memakai Grid dan Flexbox.

### 3. JavaScript
- `data.js` hanya berisi data: `dataPengguna`, `dataKatalogBuku`, `dataTracking`.
- `script.js` berisi logika. Satu file dipakai semua halaman, dibedakan lewat atribut `data-page` pada `<body>`.
- Manipulasi DOM: `createElement`, `appendChild`, `innerHTML`, `remove`.
- Validasi form dan feedback: `alert()`, pesan error di bawah form, dan modal box.
- Penyimpanan sementara: `localStorage` (akun baru, riwayat pesanan, tema) dan `sessionStorage` (sesi login).

### Kesesuaian dengan kriteria penilaian
| Kriteria | Penerapan |
|---|---|
| Struktur HTML semantik | Tag semantik di 5 halaman |
| Desain CSS | Tema, responsif, mode siang/malam |
| JavaScript DOM | Tabel dinamis, keranjang, tracking |
| Validasi form dan alert | Login, daftar, stok, pemesanan, tracking |
| Modularitas file | HTML, CSS, JS, dan data dipisah |
| Kreativitas tambahan | Mode malam, daftar akun, riwayat, timeline tracking |

---

## 📸 Tangkapan Layar

> Cara mengisi: simpan setiap screenshot ke folder `screenshots/` dengan nama file sesuai di bawah. Gambar akan otomatis muncul.

### 1. Halaman Login
**Yang perlu di-screenshot:** tampilan awal halaman login (mode siang).

![Halaman Login](screenshots/01-login.png)

### 2. Alert login gagal
**Yang perlu di-screenshot:** isi email/password salah lalu klik Login, sampai alert "Email/password yang anda masukkan salah" muncul.

![Alert Login Gagal](screenshots/02-login-gagal.png)

### 3. Modal Lupa Password
**Yang perlu di-screenshot:** klik tombol "Lupa Password" sampai modal terbuka.

![Modal Lupa Password](screenshots/03-modal-lupa.png)

### 4. Modal Daftar (dengan pesan error)
**Yang perlu di-screenshot:** klik "Daftar", isi data tidak valid (misalnya password kurang dari 6 karakter) sampai pesan error muncul.

![Modal Daftar](screenshots/04-modal-daftar.png)

### 5. Dashboard (mode siang)
**Yang perlu di-screenshot:** dashboard setelah login berhasil, pastikan sapaan dan 4 tombol menu terlihat.

![Dashboard Siang](screenshots/05-dashboard-siang.png)

### 6. Dashboard (mode malam)
**Yang perlu di-screenshot:** klik tombol "Mode Malam" di dashboard.

![Dashboard Malam](screenshots/06-dashboard-malam.png)

### 7. Halaman Stok / Katalog
**Yang perlu di-screenshot:** tabel katalog yang terisi dari `data.js`, termasuk cover buku.

![Halaman Stok](screenshots/07-stok.png)

### 8. Tambah stok baru
**Yang perlu di-screenshot:** setelah menambah buku lewat form, baris baru muncul di tabel.

![Tambah Stok](screenshots/08-stok-tambah.png)

### 9. Validasi form stok
**Yang perlu di-screenshot:** kirim form stok dengan data kosong atau salah sampai pesan error merah muncul.

![Validasi Stok](screenshots/09-stok-validasi.png)

### 10. Halaman Pemesanan (keranjang)
**Yang perlu di-screenshot:** keranjang berisi beberapa buku dengan jumlah diubah dan total terhitung.

![Keranjang](screenshots/10-checkout-keranjang.png)

### 11. Validasi form pemesan
**Yang perlu di-screenshot:** kirim form pemesan dengan No. HP atau alamat tidak valid sampai pesan error muncul.

![Validasi Pemesanan](screenshots/11-checkout-validasi.png)

### 12. Pesanan berhasil
**Yang perlu di-screenshot:** alert "Pesanan berhasil" yang menampilkan nomor Delivery Order dan total.

![Pesanan Berhasil](screenshots/12-checkout-berhasil.png)

### 13. Riwayat transaksi
**Yang perlu di-screenshot:** bagian "Laporan & History Transaksi" yang menampilkan pesanan tadi.

![Riwayat Transaksi](screenshots/13-riwayat.png)

### 14. Tracking: hasil pencarian
**Yang perlu di-screenshot:** cari nomor `20230013`, tampilkan progress bar, detail, dan riwayat perjalanan.

![Tracking Berhasil](screenshots/14-tracking-hasil.png)

### 15. Tracking: sedang dalam perjalanan
**Yang perlu di-screenshot:** cari nomor `20230012` (status "Dalam Perjalanan") untuk menunjukkan progress bar belum penuh.

![Tracking Dalam Perjalanan](screenshots/15-tracking-perjalanan.png)

### 16. Tracking: nomor tidak ditemukan
**Yang perlu di-screenshot:** cari nomor sembarang (misalnya `99999`) sampai pesan "tidak ditemukan" muncul.

![Tracking Tidak Ditemukan](screenshots/16-tracking-gagal.png)

### 17. Struktur folder project
**Yang perlu di-screenshot:** panel Explorer di editor (VS Code) yang memperlihatkan struktur folder.

![Struktur Folder](screenshots/17-struktur-folder.png)

---

## 📝 Catatan
- Data pesanan dan akun baru hanya tersimpan di browser (`localStorage`) karena project ini tidak memakai backend.
- Halaman login memakai nama `index.html` sesuai struktur folder pada soal.

[isi catatan tambahan jika ada]
