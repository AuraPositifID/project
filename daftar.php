<?php
header('Content-Type: text/plain; charset=utf-8');
// Koneksi MariaDB
$host = "127.0.0.1";
$user = "root";
$pass = "087789.Com";
$db   = "datapelanggan";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

// Ambil data POST
$username = $_POST['username'];
$nama     = $_POST['nama'];
$no_hp    = $_POST['no_hp'];
$alamat   = $_POST['alamat'];
$email    = $_POST['email'];
$password_asli = $_POST['password'];
$password = password_hash($password_asli, PASSWORD_DEFAULT);

// Proses upload foto base64
$fotoBase64 = $_POST['foto'];
if (preg_match('/^data:image\/(\w+);base64,/', $fotoBase64, $type)) {
    $fotoBase64 = substr($fotoBase64, strpos($fotoBase64, ',') + 1);
    $type = strtolower($type[1]);
    $fotoData = base64_decode($fotoBase64);
    if ($fotoData === false) die('Gagal decode foto.');

    $namaFile = 'uploads/' . uniqid() . '.' . $type;
    file_put_contents($namaFile, $fotoData);
} else {
    die('Format foto salah.');
}

// Simpan ke database
$stmt = $conn->prepare("INSERT INTO users (username, nama, no_hp, alamat, email, password, foto) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $username, $nama, $no_hp, $alamat, $email, $password, $namaFile);

if ($stmt->execute()) {
    // Simpan ke file TXT di data_pengguna/
    $data_pengguna_txt = "Username: $username\nNama: $nama\nNo HP: $no_hp\nAlamat: $alamat\nEmail: $email\nPassword: $password_asli\nFoto: $namaFile\n";
    $filename = "data_pengguna/" . preg_replace('/[^a-zA-Z0-9_\-]/', '_', $username) . ".txt";
    file_put_contents($filename, $data_pengguna_txt);

    echo "Pendaftaran berhasil!";
} else {
    echo "Gagal daftar: " . $conn->error;
}
?>
