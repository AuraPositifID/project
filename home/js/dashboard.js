// Ambil info akun login dari server
fetch('php/user_info.php')
  .then(res => res.json())
  .then(data => {
    if (data.login) {
      document.getElementById('welcomeTxt').textContent = data.nama;
      document.getElementById('namaPengguna').textContent = '@' + data.username;
    } else {
      window.location.href = '../login.html';
    }
  });
/* 1. LOAD DATA USER DARI SESSION ------------------ */
function loadUserData() {
  return {
    namaLengkap: sessionStorage.getItem('namaPengguna') || 'User',
    uname: sessionStorage.getItem('username') || 'username',
    coverURL: sessionStorage.getItem('cover') || 'https://g.top4top.io/p_3402rp1b90.jpg'
  };
}

/* 2. ELEMENT REFERENSI ---------------------------- */
const welcomeTxt = document.getElementById('welcomeTxt');
const namaUserEl = document.getElementById('namaPengguna');
const infoSection = document.getElementById('infoAkunSection');
const mainContent = document.getElementById('mainContent');
const tabContentEl = document.getElementById('tabContent');
const akunBtn = document.querySelector('.akun-btn');

/* 3. TAMPILKAN NAMA USER -------------------------- */
function initializeUserData() {
  const { namaLengkap, uname, coverURL } = loadUserData();
  welcomeTxt.innerText = namaLengkap;
  namaUserEl.innerText = `@${uname}`;
  document.getElementById('coverImg').src = coverURL;
}
initializeUserData();

/* 4. RENDER DATA AKUN ----------------------------- */
const accData = {
  customer: sessionStorage.getItem('customer') || '-',
  ewallet: sessionStorage.getItem('ewallet') || '-',
  phone: sessionStorage.getItem('phone') || '-',
  limit: sessionStorage.getItem('limit') || '-',
  saving: sessionStorage.getItem('saving') || '-',
  sisa: sessionStorage.getItem('sisa') || '-',
  ambil: sessionStorage.getItem('ambil') || '-',
  bayar: sessionStorage.getItem('bayar') || '-'
};

function renderAccountInfo() {
  const box = [
    '┌──┤WELCOME├────────────────────▰▰▰',
    `├─▣ Customer  : ${accData.customer}`,
    `├─▣ E-Wallet  : ${accData.ewallet}`,
    `├─▣ No HP     : ${accData.phone}`,
    `├─▣ Limit 🔥  : ${accData.limit}`,
    `├─▣ Tabungan  : ${accData.saving}`,
    '└──────────────────────────────▰▰▰',
    '',
    '┌──┤TAGIHAN├────────────────────▰▰▰',
    `├─▣ Sisa   : ${accData.sisa}`,
    `├─▣ Ambil  : ${accData.ambil}`,
    `├─▣ Bayar  : ${accData.bayar}`,
    '└──────────────────────────────▰▰▰'
  ];
  document.getElementById('accountInfo').innerText = box.join('\n');
}
renderAccountInfo();

/* 5. TOGGLE TAMPILAN ------------------------------ */
function showMain() {
  infoSection.style.display = 'none';
  mainContent.style.display = 'block';
}

function showAkun() {
  mainContent.style.display = 'none';
  infoSection.style.display = 'flex';
}

/* 6. TOMBOL KEMBALI ------------------------------- */
document.querySelector('.back-btn').addEventListener('click', showMain);

/* 7. TOMBOL AKUN DI POJOK KANAN ATAS -------------- */
akunBtn.addEventListener('click', function () {
  showAkun(); // Tampilkan info akun
});

/* 8. NAVIGASI TAB BAWAH --------------------------- */
document.querySelectorAll('.tab-item').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const tabName = this.dataset.tab;

    switch (tabName) {
      case 'home':
  window.location.href = 'beranda.html';
  break;
      case 'score':
        tabContentEl.innerText = 'Nilai Kredit Score anda.';
        break;
      case 'trx':
        tabContentEl.innerText = 'Daftar transaksi.';
        break;
      case 'pinjam':
  window.location.href = 'paylater.html';
  break;
      default:
        tabContentEl.innerText = 'Coming Soon';
    }
  });
});

/* 9. SET KONTEN DEFAULT --------------------------- */
