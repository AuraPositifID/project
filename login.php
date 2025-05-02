<?php
header('Content-Type: text/plain; charset=utf-8');
session_start();

$host = "127.0.0.1";
$user = "root";
$pass = "087789.Com";
$db   = "datapelanggan";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT username, nama, password FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 1) {
    $stmt->bind_result($db_username, $db_nama, $db_password);
    $stmt->fetch();
    if (password_verify($password, $db_password)) {
        $_SESSION['login'] = $db_username;
        $_SESSION['nama'] = $db_nama;
        echo "Sukses login";
    } else {
        echo "Password salah!";
    }
} else {
    echo "Username tidak ditemukan!";
}
?>
