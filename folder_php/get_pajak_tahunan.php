<?php
// 1. Atur header agar mengembalikan format data JSON
header("Content-Type: application/json; charset=UTF-8");

// 2. Hubungkan ke database MySQL
require_once "koneksi.php";

// 3. Jalankan query untuk mengambil seluruh data (data terbaru muncul paling atas)
$sql = "SELECT * FROM pajak_tahunan ORDER BY id DESC";
$result = $conn->query($sql);

$data = array();

if ($result) {
    // 4. Ambil setiap baris data dan masukkan ke dalam Array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    // 5. Kirim data Array tersebut ke JavaScript dalam format JSON
    echo json_encode($data);
} else {
    // Jika query error, kirim status error
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

// 6. Tutup koneksi database
$conn->close();
?>