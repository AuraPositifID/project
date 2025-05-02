// beranda.js

// Produk Dummy
const produk = [
    { nama: "Pulsa Telkomsel 20k", kategori: "pulsa", gambar: "../gambar/pulsa.png" },
    { nama: "Voucher Game", kategori: "voucher", gambar: "../gambar/voucher.png" },
    { nama: "Kaos MJB", kategori: "fisik", gambar: "../gambar/kaos.png" },
];

// Video Dummy
const videos = [
    { judul: "Promo Pulsa", file: "../uploads/videos/promo-pulsa.mp4", likes: 0 },
    { judul: "New Voucher", file: "../uploads/videos/new-voucher.mp4", likes: 0 },
];

// Tampilkan Produk / Video
const produkList = document.getElementById('produk-list');
const tabs = document.querySelectorAll('.tab');

function tampilkanProduk(kategori) {
    produkList.innerHTML = '';

    if (kategori === 'video-reels') {
        videos.forEach((video, index) => {
            produkList.innerHTML += `
                <div class="produk-card">
                    <video width="100%" controls>
                        <source src="${video.file}" type="video/mp4">
                        Browser kamu tidak mendukung video.
                    </video>
                    <p style="text-align:center;">${video.judul}</p>
                    <div class="video-actions">
                        <button onclick="likeVideo(${index})" class="like-btn">❤️ <span id="like-count-${index}">${video.likes}</span></button>
                        <button onclick="shareVideo('${video.file}')" class="share-btn">🔗 Share</button>
                    </div>
                </div>
            `;
        });
        return;
    }

    produk.filter(item => kategori === 'all' || item.kategori === kategori)
          .forEach(item => {
            produkList.innerHTML += `
                <div class="produk-card">
                    <img src="${item.gambar}" alt="${item.nama}" style="width:100%; border-radius:8px;">
                    <h3 style="text-align:center;">${item.nama}</h3>
                </div>
            `;
          });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        tampilkanProduk(tab.dataset.category);
    });
});

// Load Default
tampilkanProduk('all');

// Like dan Share
function likeVideo(index) {
    videos[index].likes++;
    document.getElementById(`like-count-${index}`).innerText = videos[index].likes;
}

function shareVideo(file) {
    const baseUrl = window.location.origin + '/' + file;
    navigator.clipboard.writeText(baseUrl).then(() => {
        alert("Link video berhasil disalin!");
    });
}

// Jam Digital
function updateClock() {
    const now = new Date();
    now.setHours(now.getHours() + 7); // WIB GMT+7
    const jam = now.getHours().toString().padStart(2, '0');
    const menit = now.getMinutes().toString().padStart(2, '0');
    const detik = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${jam} : ${menit} : ${detik} WIB`;
}
setInterval(updateClock, 1000);
updateClock();

// Dark Mode otomatis setelah jam 18:00
function autoDarkMode() {
    const now = new Date();
    if (now.getHours() >= 18 || now.getHours() <= 6) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}
setInterval(autoDarkMode, 60000);
autoDarkMode();

// Loading Spinner
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});
