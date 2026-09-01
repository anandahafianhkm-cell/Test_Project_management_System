<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once "koneksi.php";

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if ($data) {
    $nama = $conn->real_escape_string($data['nama_konsumen']);
    $nomor_hp = $conn->real_escape_string($data['nomor_hp_konsumen']);
    $tanggal = $conn->real_escape_string($data['tanggal_masuk']);
    $plat = $conn->real_escape_string($data['nomor_polisi']);
    $total = $conn->real_escape_string($data['total_biaya']);
    $dp = $conn->real_escape_string($data['dp_dibayar']);
    $kekurangan = $conn->real_escape_string(($data['kekurangan_biaya']));
    $berkas = $conn->real_escape_string($data['kelengkapan_berkas']);
    $mitra = $conn->real_escape_string($data['mitra_pengerjaan']);
    $catatan = $conn->real_escape_string($data['catatan']);

    $sql = "INSERT INTO pajak_5tahunan
            (nama_konsumen, nomor_hp_konsumen, tanggal_masuk, nomor_polisi, total_biaya, dp_dibayar, kekurangan_biaya, kelengkapan_berkas, mitra_pengerjaan, catatan)
            VALUES
            ('$nama', '$nomor_hp', '$tanggal', '$plat', '$total', '$dp', '$kekurangan', '$berkas', '$mitra', '$catatan')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Data Pajak 5 Tahunan Berhasil Disimpan"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Gagal Simpan: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data JSON tidak valid"]);
}
?>
