# 📚 BukuKu – Aplikasi Web Pemesanan Buku

Tugas UTS Pemrograman Web 1

| | |
|---|---|
| **Nama** | Alvin Al Aziz |
| **NIM** | 31510044 |
| **Kelas / Prodi** | I252A/Teknik Informatika |
| **Dosen Pengampu** | Agung Nugroho S.kom, M.kom |

## 🎥 Video Penjelasan

▶️ **Link YouTube:** [https://youtu.be/4MdXdQ6hdY0]

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
tampilan awal halaman login (mode siang).

![Halaman Login] <img width="1497" height="935" alt="image" src="https://github.com/user-attachments/assets/5d08625d-a8e2-48a7-a221-d2979c04fb43" />


### 2. Alert login gagal
isi email/password salah lalu klik Login, sampai alert "Email/password yang anda masukkan salah" muncul.

![Alert Login Gagal] <img width="1502" height="927" alt="image" src="https://github.com/user-attachments/assets/9edf09d1-59e1-4020-b2f1-94c47a940bd8" />


### 3. Modal Lupa Password
klik tombol "Lupa Password" sampai modal terbuka.

![Modal Lupa Password] <img width="1502" height="897" alt="image" src="https://github.com/user-attachments/assets/1e235a78-9a72-4a42-ba30-8358c41738ac" />


### 4. Modal Daftar (dengan pesan error)
klik "Daftar", isi data tidak valid (misalnya password kurang dari 6 karakter) sampai pesan error muncul.

![Modal Daftar] <img width="1496" height="937" alt="image" src="https://github.com/user-attachments/assets/16415f87-b5d1-4ad0-b5b1-212239995254" />


### 5. Dashboard (mode siang)
dashboard setelah login berhasil, pastikan sapaan dan 4 tombol menu terlihat.

![Dashboard Siang] <img width="1495" height="935" alt="image" src="https://github.com/user-attachments/assets/335b1923-6d23-42ba-a1fd-40ee88923f0f" />


### 6. Dashboard (mode malam)
klik tombol "Mode Malam" di dashboard.

![Dashboard Malam] <img width="1500" height="932" alt="image" src="https://github.com/user-attachments/assets/5ae9e3bc-3502-4590-8214-69afc63cb576" />


### 7. Halaman Stok / Katalog
\tabel katalog yang terisi dari `data.js`, termasuk cover buku.

![Halaman Stok] <img width="1247" height="782" alt="image" src="https://github.com/user-attachments/assets/7eb52dd7-b956-46ce-bff7-ef43c7c3ae8c" />


### 8. Tambah stok baru
setelah menambah buku lewat form, baris baru muncul di tabel.

![Tambah Stok] <img width="1217" height="792" alt="image" src="https://github.com/user-attachments/assets/94c95b39-3e3d-414e-b357-e0be645a4ce9" />


### 9. Validasi form stok
kirim form stok dengan data kosong atau salah sampai pesan error merah muncul.

![Validasi Stok] <img width="1501" height="717" alt="image" src="https://github.com/user-attachments/assets/f0dbaf3f-5570-4c78-8a67-11bb77ca110d" />


### 10. Halaman Pemesanan (keranjang)
keranjang berisi beberapa buku dengan jumlah diubah dan total terhitung.

![Keranjang] <img width="1361" height="550" alt="image" src="https://github.com/user-attachments/assets/05825049-b4e9-418b-b395-e8aeb9e71d40" />


### 11. Validasi form pemesan
kirim form pemesan dengan No. HP atau alamat tidak valid sampai pesan error muncul.

![Validasi Pemesanan] <img width="1221" height="488" alt="image" src="https://github.com/user-attachments/assets/9d0bb688-a57b-43bf-8b65-7c15f03d5aad" />


### 12. Pesanan berhasil
alert "Pesanan berhasil" yang menampilkan nomor Delivery Order dan total.

![Pesanan Berhasil] <img width="1182" height="417" alt="image" src="https://github.com/user-attachments/assets/54bb3dc2-914b-4084-bc75-c8d23b705aed" />


### 13. Riwayat transaksi
bagian "Laporan & History Transaksi" yang menampilkan pesanan tadi.

![Riwayat Transaksi] <img width="1231" height="286" alt="image" src="https://github.com/user-attachments/assets/450b8ae4-ba95-4a24-ada9-f8faf5735db8"/>
)

### 14. Tracking: hasil pencarian
cari nomor `20230013`, tampilkan progress bar, detail, dan riwayat perjalanan.

![Tracking Berhasil] <img width="1248" height="847" alt="image" src="https://github.com/user-attachments/assets/b58fbfb1-a82f-4aba-934e-e9b9954693f1" />


### 15. Tracking: sedang dalam perjalanan
cari nomor `20230012` (status "Dalam Perjalanan") untuk menunjukkan progress bar belum penuh.

![Tracking Dalam Perjalanan] <img width="1330" height="832" alt="image" src="https://github.com/user-attachments/assets/7115bc07-bee2-45e0-ba65-89e546e0388a" />


### 16. Tracking: nomor tidak ditemukan
cari nomor sembarang (misalnya `99999`) sampai pesan "tidak ditemukan" muncul.

![Tracking Tidak Ditemukan] <img width="1222" height="372" alt="image" src="https://github.com/user-attachments/assets/c88ea3ae-3a1b-4256-9080-d57381bce342" />
 

### 17. Struktur folder project
panel Explorer di editor (VS Code) yang memperlihatkan struktur folder.

![Struktur Folder] <img width="342" height="537" alt="image" src="https://github.com/user-attachments/assets/dd3f6e30-c6f1-4d12-b2ae-ec398176dba6" />


---

- Data pesanan dan akun baru hanya tersimpan di browser (`localStorage`) karena project ini tidak memakai backend.
- Halaman login memakai nama `index.html` sesuai struktur folder pada soal.
