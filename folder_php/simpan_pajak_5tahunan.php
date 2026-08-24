<?php
header("Content-Type: application/json");
require_once "koneksi.php";

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if ($data) {
    
}