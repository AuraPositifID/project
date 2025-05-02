/ Ambil elemen tab-content
const tabContentEl = document.getElementById('tabContent');

function renderPaylaterForm() {
  tabContentEl.innerHTML = `
    <div class="paylater-form">
      <div>
        <label>Masukkan Saldo Paylater:</label>
        <input type="number" id="paylaterSaldo" min="10000" placeholder="Minimal 10.000" style="width:80%;padding:8px;border-radius:8px;border:1px solid #ccc;">
      </div>
      <div style="margin:16px 0 0;">
        <label>Masukkan Voucher:</label>
        <input type="text" id="voucherInput" placeholder="Kode Voucher" style="width:60%;padding:8px;border-radius:8px;border:1px solid #ccc;">
        <button id="voucherSubmit" style="padding:8px 16px;border:none;border-radius:7px;background:#3498db;color:#fff;font-weight:600;">Ambil</button>
      </div>
      <div id="voucherMessage" style="margin-top:15px;font-size:15px;"></div>
      <div id="voucherResult" style="margin-top:18px;text-align:center;"></div>
    </div>
  `;

  // Event submit voucher
  document.getElementById('voucherSubmit').onclick = async function() {
    const kode = document.getElementById('voucherInput').value.trim();
    const saldo = document.getElementById('paylaterSaldo').value.trim();
    const msg = document.getElementById('voucherMessage');
    const res = document.getElementById('voucherResult');
    msg.textContent = '';
    res.innerHTML = '';

    if (!kode) return msg.textContent = 'Kode voucher wajib diisi!';
    if (!saldo || saldo < 10000) return msg.textContent = 'Saldo minimal 10.000!';

    // Tampilkan loading
    res.innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:2em;color:#3498db"></i><br>Memproses...';
    msg.textContent = '';

    // Kirim ke PHP backend
    try {
      const response = await fetch('php/ambil_voucher.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `kode=${encodeURIComponent(kode)}&saldo=${encodeURIComponent(saldo)}`
      });
      const data = await response.json();

      if (data.status === 'ok') {
        res.innerHTML = `
          <div style="margin:16px 0;">
            <i class="fa fa-gift" style="font-size:3em;color:#2ecc71;cursor:pointer;" title="Klaim Voucher" onclick="window.open('${data.link}','_blank')"></i>
          </div>
          <div><b>Voucher Berhasil!</b></div>
          <div><a href="${data.link}" target="_blank" style="color:#3498db;">Klik di sini untuk klaim</a></div>
        `;
        msg.textContent = '';
      } else {
        res.innerHTML = '';
        msg.textContent = data.pesan || 'Voucher tidak ditemukan!';
      }
    } catch (err) {
      res.innerHTML = '';
      msg.textContent = 'Terjadi error koneksi!';
    }
  };
}

// Handle tab Paylater dari dashboard.js
document.querySelectorAll('.tab-item').forEach(tab => {
  tab.addEventListener('click', function() {
    if (this.dataset.tab === 'pinjam') renderPaylaterForm();
  });
});

// Jika buka default, bisa trigger juga (opsional)
// if (document.querySelector('.tab-item.active').dataset.tab === 'pinjam') renderPaylaterForm();
