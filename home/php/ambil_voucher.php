<?php
// File voucher
$voucherFile = '../voucher/voucher.txt';
$diambilFile = '../voucher/voucherdiambil.txt';

// Cek input
$kode = isset($_POST['kode']) ? trim($_POST['kode']) : '';
$saldo = isset($_POST['saldo']) ? intval($_POST['saldo']) : 0;

if ($kode === '' || $saldo < 10000) {
  echo json_encode(['status'=>'err', 'pesan'=>'Data tidak valid!']); exit;
}

// Cari voucher
$found = false;
$link = '';
$lines = file($voucherFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $i => $row) {
  list($vcode, $vlink) = explode('|', $row, 2);
  if (strcasecmp($vcode, $kode) == 0) {
    $found = true;
    $link = trim($vlink);
    // Hapus dari voucher.txt
    unset($lines[$i]);
    file_put_contents($voucherFile, implode(PHP_EOL, $lines));
    // Tambah ke voucherdiambil.txt
    file_put_contents($diambilFile, "$vcode|$vlink|$saldo|" . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);
    break;
  }
}

if ($found) {
  echo json_encode(['status'=>'ok', 'link'=>$link]);
} else {
  echo json_encode(['status'=>'err', 'pesan'=>'Kode voucher tidak ditemukan!']);
}
