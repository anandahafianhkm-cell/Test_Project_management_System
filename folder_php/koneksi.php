<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "Database_Biro_Jasa_SADIDA";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Koneksi ke Database Gagal: " . $conn->connect_error]));
}
