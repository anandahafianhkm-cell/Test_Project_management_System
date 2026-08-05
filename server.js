const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

//Membuka izin agar folder utama bisa diakses oleh Browser
app.use(express.static(__dirname));
//Mengizinkan server menerima data format JSON dari browser
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'projects.json');

//Jalur khusus untuk menerima kiriman data dari form HTML
app.post('/simpan-project', (req, res) => {
    const dataBaru = req.body;

    //1. Baca data yang sudah ada di file projects.json
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let listProject = [];

        if (!err && data) {
            try {
                listProject = JSON.parse(data);
            } catch (e) {
                listProject = [];
            }
        }

        //2. Tambahkan data konsumen baru ke dalam array 
        listProject.push(dataBaru);

        //3. Tulis kembali seluruh array yang baru ke file projects.json
        fs.writeFile(FILE_PATH, JSON.stringify(listProject, null, 4), 'utf-8', (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Gagal menulis file" });
            }
            res.json({ success: true, message: "Data berhasil disimpan permanen" });
        });
    });
});

//Jalankan Server Backend di komputer
app.listen(PORT, () => {
    console.log(`Server jalan! Buka web Anda di http://localhost:${PORT}`);
})