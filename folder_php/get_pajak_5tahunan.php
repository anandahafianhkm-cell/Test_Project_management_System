<?php
// Tambahkan 3 baris ini untuk memunculkan error PHP di layar:
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
require_once "koneksi.php";

// Sesuaikan nama tabel ini dengan yang ada di phpMyAdmin
$sql = "SELECT * FROM pajak_5tahunan ORDER BY id DESC"; 
$result = $conn->query($sql);

if (!$result) {
    // Jika query gagal (misal nama tabel salah), tampilkan error dari MySQL
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>