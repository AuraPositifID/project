<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
if (!isset($_SESSION['login'])) {
    echo json_encode(['login' => false]);
    exit;
}
echo json_encode([
    'login'    => true,
    'username' => $_SESSION['login'],
    'nama'     => $_SESSION['nama']
]);
?>
