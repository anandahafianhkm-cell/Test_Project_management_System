<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "koneksi.php";

$sql = "SELECT * FROM duplikat_stnk ORDER BY id DESC";
$result = $conn->query($sql);

$data = array();
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>