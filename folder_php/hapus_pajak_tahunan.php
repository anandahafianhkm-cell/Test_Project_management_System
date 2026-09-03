<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "koneksi.php";

// Terima data JSON dari JavaScript
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id'])) {
    $id = $input['id'];

    // Gunakan Prepared Statement untuk keamanan SQL Injection
    $stmt = $conn->prepare("DELETE FROM pajak_tahunan WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Data berhasil dihapus"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Gagal menghapus data: " . $conn->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID tidak ditemukan"]);
}

$conn->close();
?>