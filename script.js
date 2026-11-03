/* ===== Utilitas ===== */
const $ = (s, p = document) => p.querySelector(s);
const rp = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID');
const simpan = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const ambil = k => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const halaman = document.body.dataset.page;
const bukaModal = id => { $('#' + id).hidden = false; };
const tutupModal = id => { $('#' + id).hidden = true; };
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tutup]'); if (t) tutupModal(t.dataset.tutup);
  if (e.target.classList.contains('modal')) e.target.hidden = true;
});

/* ===== Mode siang/malam (disimpan di localStorage) ===== */
document.documentElement.dataset.tema = localStorage.getItem('tema') || 'siang';
const btnTema = $('#btnTema');
if (btnTema) {
  const label = () => btnTema.textContent = document.documentElement.dataset.tema === 'malam' ? '☀️ Mode Siang' : '🌙 Mode Malam';
  label();
  btnTema.addEventListener('click', () => {
    const t = document.documentElement.dataset.tema === 'malam' ? 'siang' : 'malam';
    document.documentElement.dataset.tema = t; localStorage.setItem('tema', t); label();
  });
}

/* ===== Proteksi halaman & logout ===== */
if (halaman !== 'login' && !sessionStorage.getItem('user')) location.href = 'index.html';
const btnLogout = $('#btnLogout');
if (btnLogout) btnLogout.addEventListener('click', () => { sessionStorage.clear(); location.href = 'index.html'; });

/* ===== 1. LOGIN ===== */
if (halaman === 'login') {
  const semuaUser = () => [...dataPengguna, ...ambil('users')];
  $('#formLogin').addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#email').value.trim(), pass = $('#password').value;
    if (!email || !pass) return alert('Email dan password wajib diisi.');
    const u = semuaUser().find(x => x.email === email && x.password === pass);
    if (!u) return alert('Email/password yang anda masukkan salah');
    sessionStorage.setItem('user', u.nama || u.email);
    location.href = 'dashboard.html';
  });
  $('#btnLupa').addEventListener('click', () => bukaModal('modalLupa'));
  $('#btnDaftar').addEventListener('click', () => bukaModal('modalDaftar'));
  $('#formLupa').addEventListener('submit', e => {
    e.preventDefault();
    const em = $('#emailLupa').value.trim();
    alert(semuaUser().some(x => x.email === em)
      ? 'Tautan reset password telah dikirim ke ' + em
      : 'Email tidak terdaftar.');
    tutupModal('modalLupa');
  });
  $('#formDaftar').addEventListener('submit', e => {
    e.preventDefault();
    const nama = $('#namaDaftar').value.trim(), em = $('#emailDaftar').value.trim(), pw = $('#passDaftar').value;
    const err = $('#errDaftar');
    if (nama.length < 3) return err.textContent = 'Nama minimal 3 karakter.';
    if (!/^\S+@\S+\.\S+$/.test(em)) return err.textContent = 'Format email tidak valid.';
    if (pw.length < 6) return err.textContent = 'Password minimal 6 karakter.';
    if (semuaUser().some(x => x.email === em)) return err.textContent = 'Email sudah terdaftar.';
    const baru = ambil('users'); baru.push({ nama, email: em, password: pw }); simpan('users', baru);
    err.textContent = ''; alert('Pendaftaran berhasil. Silakan login.');
    e.target.reset(); tutupModal('modalDaftar');
  });
}

/* ===== 2. DASHBOARD: greeting sesuai jam lokal ===== */
if (halaman === 'dashboard') {
  const jam = new Date().getHours();
  const sapa = jam < 11 ? 'Selamat pagi' : jam < 15 ? 'Selamat siang' : jam < 18 ? 'Selamat sore' : 'Selamat malam';
  $('#greeting').textContent = `${sapa}, ${sessionStorage.getItem('user')}!`;
}

/* ===== Helper format data: harga di data.js berupa teks "Rp 180.000" ===== */
const angka = v => typeof v === 'number' ? v : Number(String(v).replace(/\D/g, ''));
const tampilRp = v => typeof v === 'number' ? rp(v) : v;

/* ===== 3. STOK: render dinamis + tambah baris via DOM ===== */
if (halaman === 'stok') {
  const tbody = $('#tbodyStok');
  const info = () => $('#infoStok').textContent = dataKatalogBuku.length ? `Total ${dataKatalogBuku.length} judul buku.` : 'Belum ada data buku. Tambahkan lewat form di atas.';
  function buatBaris(b) {
    const tr = document.createElement('tr');
    const sel = (teks, cls) => { const td = document.createElement('td'); td.textContent = teks; if (cls) td.className = cls; return td; };
    const tdImg = document.createElement('td'), img = document.createElement('img');
    img.src = b.cover || ''; img.alt = b.namaBarang; img.onerror = () => img.style.visibility = 'hidden';
    tdImg.appendChild(img);
    const tdAksi = document.createElement('td'), hapus = document.createElement('button');
    hapus.textContent = 'Hapus'; hapus.className = 'btn kecil bahaya';
    hapus.addEventListener('click', () => {
      if (confirm(`Hapus "${b.namaBarang}" dari daftar?`)) { dataKatalogBuku.splice(dataKatalogBuku.indexOf(b), 1); tr.remove(); info(); }
    });
    tdAksi.appendChild(hapus);
    tr.append(tdImg, sel(b.kodeBarang), sel(b.namaBarang), sel(b.jenisBarang), sel(b.edisi), sel(tampilRp(b.harga)), sel(b.stok, b.stok < 100 ? 'stok-rendah' : ''), tdAksi);
    return tr;
  }
  dataKatalogBuku.forEach(b => tbody.appendChild(buatBaris(b))); info();

  $('#formStok').addEventListener('submit', e => {
    e.preventDefault();
    let cover = $('#cover').value.trim(); if (cover && !cover.includes('/')) cover = 'img/' + cover;
    const hargaAngka = Number($('#harga').value);
    const b = { kodeBarang: $('#kode').value.trim(), namaBarang: $('#nama').value.trim(), jenisBarang: $('#jenis').value.trim(),
      edisi: $('#edisi').value.trim(), stok: Number($('#stok').value), harga: rp(hargaAngka), cover };
    const err = $('#errStok');
    if (!b.kodeBarang || !b.namaBarang || !b.jenisBarang) return err.textContent = 'Kode, nama, dan jenis barang wajib diisi.';
    if (!b.edisi) return err.textContent = 'Edisi wajib diisi.';
    if (!(hargaAngka > 0)) return err.textContent = 'Harga harus lebih dari 0.';
    if (!(b.stok >= 0) || $('#stok').value === '') return err.textContent = 'Stok harus angka 0 atau lebih.';
    if (dataKatalogBuku.some(x => x.kodeBarang === b.kodeBarang)) return err.textContent = 'Kode barang sudah dipakai.';
    err.textContent = ''; dataKatalogBuku.push(b); tbody.appendChild(buatBaris(b)); info(); e.target.reset();
  });
}

/* ===== 4. CHECKOUT: keranjang tambah/ubah/hapus + data pemesan ===== */
if (halaman === 'checkout') {
  let keranjang = [];
  const pilih = $('#pilihBuku'), tbody = $('#tbodyKeranjang');
  dataKatalogBuku.forEach((b, i) => pilih.add(new Option(`${b.kodeBarang} - ${b.namaBarang} (${tampilRp(b.harga)})`, i)));
  const hitungTotal = () => keranjang.reduce((s, k) => s + k.harga * k.qty, 0);

  function gambar() {
    tbody.innerHTML = '';
    keranjang.forEach((k, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${k.judul}</td><td>${rp(k.harga)}</td>
        <td><input type="number" min="1" value="${k.qty}" data-i="${i}" aria-label="Jumlah"></td>
        <td>${rp(k.harga * k.qty)}</td><td><button class="btn kecil bahaya" data-hapus="${i}">Hapus</button></td>`;
      tbody.appendChild(tr);
    });
    if (!keranjang.length) tbody.innerHTML = '<tr><td colspan="5" class="kosong">Keranjang masih kosong.</td></tr>';
    $('#totalBayar').textContent = rp(hitungTotal());
  }
  $('#btnTambah').addEventListener('click', () => {
    const b = dataKatalogBuku[pilih.value], qty = Number($('#qty').value);
    if (!b) return alert('Pilih buku terlebih dahulu.');
    if (!(qty >= 1)) return alert('Jumlah minimal 1.');
    const ada = keranjang.find(k => k.kode === b.kodeBarang);
    ada ? ada.qty += qty : keranjang.push({ kode: b.kodeBarang, judul: b.namaBarang, harga: angka(b.harga), qty });
    gambar();
  });
  tbody.addEventListener('change', e => { if (e.target.dataset.i) { keranjang[e.target.dataset.i].qty = Math.max(1, Number(e.target.value)); gambar(); } });
  tbody.addEventListener('click', e => { if (e.target.dataset.hapus) { keranjang.splice(e.target.dataset.hapus, 1); gambar(); } });

  $('#formPesan').addEventListener('submit', e => {
    e.preventDefault();
    const nama = $('#namaPemesan').value.trim(), alamat = $('#alamat').value.trim(), hp = $('#hp').value.trim();
    const err = $('#errPesan');
    if (!keranjang.length) return err.textContent = 'Tambahkan minimal satu buku ke keranjang.';
    if (nama.length < 3) return err.textContent = 'Nama pemesan minimal 3 karakter.';
    if (!/^08\d{8,12}$/.test(hp)) return err.textContent = 'No. HP harus diawali 08 dan 10–14 digit.';
    if (alamat.length < 10) return err.textContent = 'Alamat pengiriman minimal 10 karakter.';
    const total = rp(hitungTotal()), nomorDO = new Date().getFullYear() + Date.now().toString().slice(-4);
    const sekarang = new Date(), waktu = sekarang.toISOString().slice(0, 10) + ' ' + sekarang.toTimeString().slice(0, 8);
    const riwayat = ambil('riwayat');
    riwayat.push({ nomorDO, nama, status: 'Diproses', ekspedisi: $('#ekspedisi').value, tanggalKirim: waktu.slice(0, 10),
      paket: 'Reguler', total, metode: $('#metode').value, item: keranjang.map(k => `${k.judul} x${k.qty}`).join(', '),
      perjalanan: [{ waktu, keterangan: 'Pesanan dibuat dan sedang diproses' }] });
    simpan('riwayat', riwayat); err.textContent = '';
    alert(`Pesanan berhasil!\nNomor Delivery Order: ${nomorDO}\nTotal: ${total}`);
    keranjang = []; e.target.reset(); gambar(); tampilRiwayat();
  });

  function tampilRiwayat() {
    const tb = $('#tbodyRiwayat'), r = ambil('riwayat'); tb.innerHTML = '';
    if (!r.length) tb.innerHTML = '<tr><td colspan="5" class="kosong">Belum ada transaksi.</td></tr>';
    r.slice().reverse().forEach(x => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${x.nomorDO}</td><td>${x.nama}</td><td>${x.item}</td><td>${x.metode}</td><td>${x.total}</td>`;
      tb.appendChild(tr);
    });
  }
  gambar(); tampilRiwayat();
}

/* ===== 5. TRACKING: dataTracking berbentuk objek dengan kunci = nomor DO ===== */
if (halaman === 'tracking') {
  const langkah = ['Diproses', 'Dikemas', 'Dikirim', 'Diterima'];
  $('#formCari').addEventListener('submit', e => {
    e.preventDefault();
    const no = $('#noDO').value.trim(), hasil = $('#hasil');
    if (!no) return alert('Nomor Delivery Order wajib diisi.');
    const d = dataTracking[no] || ambil('riwayat').find(x => x.nomorDO === no);
    hasil.hidden = false;
    if (!d) { hasil.innerHTML = '<p class="galat">Nomor Delivery Order tidak ditemukan.</p>'; return; }
    const log = d.perjalanan || [], akhir = (log[log.length - 1] || {}).keterangan || '', st = d.status.toLowerCase();
    // Tentukan langkah progress dari teks status & catatan perjalanan terakhir
    let i = /selesai|diterima/i.test(akhir + st) ? 3 : /kirim|perjalanan/.test(st) ? 2 : /kemas/.test(st) ? 1 : 0;
    hasil.innerHTML = `<h2>No. DO ${d.nomorDO}</h2>
      <div class="bar" role="progressbar" aria-valuenow="${(i + 1) * 25}" aria-valuemin="0" aria-valuemax="100"><span style="width:${(i + 1) * 25}%"></span></div>
      <div class="progres">${langkah.map((s, n) => `<div class="langkah ${n <= i ? 'aktif' : ''}">${s}</div>`).join('')}</div>
      <dl><dt>Nama Pemesan</dt><dd>${d.nama}</dd><dt>Status</dt><dd>${d.status}</dd><dt>Ekspedisi</dt><dd>${d.ekspedisi}</dd>
      <dt>Tanggal Kirim</dt><dd>${d.tanggalKirim}</dd><dt>Jenis Paket</dt><dd>${d.paket}</dd><dt>Total Pembayaran</dt><dd>${d.total}</dd></dl>
      <h3>Riwayat perjalanan</h3>
      <div class="tabel-wrap"><table><thead><tr><th>Waktu</th><th>Keterangan</th></tr></thead><tbody>
      ${log.slice().reverse().map(p => `<tr><td>${p.waktu}</td><td>${p.keterangan}</td></tr>`).join('') || '<tr><td colspan="2" class="kosong">Belum ada riwayat.</td></tr>'}
      </tbody></table></div>`;
  });
}
