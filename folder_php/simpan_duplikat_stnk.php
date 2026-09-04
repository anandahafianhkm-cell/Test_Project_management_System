<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "koneksi.php";

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Data tidak valid"]);
    exit;
}

$nama_konsumen     = $data['nama_konsumen'] ?? '';
$nomor_hp_konsumen = $data['nomor_hp_konsumen'] ?? '';
$tanggal_masuk     = $data['tanggal_masuk'] ?? '';
$nomor_polisi      = $data['nomor_polisi'] ?? '';
$total_biaya       = $data['total_biaya'] ?? 0;
$dp_dibayar        = $data['dp_dibayar'] ?? 0;
$kekurangan_biaya  = $data['kekurangan_biaya'] ?? 0;
$kelengkapan_berkas= isset($data['kelengkapan_berkas']) ? json_encode($data['kelengkapan_berkas']) : '[]';
$mitra_pengerjaan  = $data['mitra_pengerjaan'] ?? '';
$catatan           = $data['catatan'] ?? '';

$stmt = $conn->prepare("INSERT INTO duplikat_stnk (nama_konsumen, nomor_hp_konsumen, tanggal_masuk, nomor_polisi, total_biaya, dp_dibayar, kekurangan_biaya, kelengkapan_berkas, mitra_pengerjaan, catatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssdddsss", $nama_konsumen, $nomor_hp_konsumen, $tanggal_masuk, $nomor_polisi, $total_biaya, $dp_dibayar, $kekurangan_biaya, $kelengkapan_berkas, $mitra_pengerjaan, $catatan);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data Duplikat STNK berhasil disimpan"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$stmt->close();
$conn->close();
?>