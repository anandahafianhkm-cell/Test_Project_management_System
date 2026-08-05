// Ambil semua elemen form yang dibutuhkan dari HTML
const totalBiayaInput = document.getElementById('total_biaya');
const dpDibayarInput = document.getElementById('dp_dibayar');
const kekuranganBiayaInput = document.getElementById('kekurangan_biaya');
const projectForm = document.getElementById('projectForm');

// Fungsi hitung otomatis kekurangan biaya
function hitungKekurangan() {
    const total = parseFloat(totalBiayaInput.value) || 0;
    const dp = parseFloat(dpDibayarInput.value) || 0;

    // Rumus Hitung Sisa Kekurangan
    const kekurangan = total - dp;

    // Tampilkan hasil hitungan ke kolom kekurangan biaya
    kekuranganBiayaInput.value = kekurangan;
}

// Jalankan fungsi hitung setiap kali pengguna mengetik di kolom atau DP
totalBiayaInput.addEventListener('input', hitungKekurangan);
dpDibayarInput.addEventListener('input', hitungKekurangan);

// Logika saat tombol "proses dan simpan" diklik
projectForm.addEventListener('submit', function (event) {
    // Berhentikan reload halaman otomatis bawaan browser
    event.preventDefault();

    // Buat ID unik acak untuk konsumen dan project (sebagai pembeda)
    const idKonsumen = "K-" + Math.floor(1000 + Math.random() * 9000);
    const idProject = "PRJ-" + Math.floor(1000 + Math.random() * 9000);

    // Ambil tanggal hari ini secara otomatis untuk tanggal masuk
    const tanggalHariIni = new Date().toISOString().split('T')[0];

    // DEKLARASI VARIABEL ANGKA (Penting agar bisa dimasukkan ke objek biaya)
    const total = parseFloat(totalBiayaInput.value) || 0;
    const dp = parseFloat(dpDibayarInput.value) || 0;
    const kekurangan = total - dp;

    // Susun data dari form ke dalam Struktur Array JSON yang sudah kita sepakati :
    const dataProjectBaru = {
        "id_konsumen": idKonsumen,
        "nama_konsumen": document.getElementById('nama_konsumen').value,
        "nomor_hp": document.getElementById('nomor_hp_konsumen').value,
        "daftar_project": [
            {
                "id_project": idProject,
                "tanggal_masuk": tanggalHariIni,
                "jenis_project": document.getElementById('jenis_project').value,
                "nomor_polisi": document.getElementById('nomor_polisi').value.toUpperCase(), // Otomatis Huruf Kapital
                "vendor_mitra": {
                    "nama_mitra": document.getElementById('nama_mitra').value,
                    "nomor_hp_mitra": document.getElementById('nomor_hp_mitra').value
                },
                "biaya": {
                    "total_biaya": total,
                    "dp_dibayar": dp,
                    "kekurangan_biaya": kekurangan
                },
                "berkas_ditinggal": {
                    "bpkb_asli": document.getElementById('bpkb-asli').checked,
                    "stnk_asli": document.getElementById('stnk-asli').checked,
                    "ktp_asli": document.getElementById('ktp-asli').checked,
                    "bpkb_fc": document.getElementById('bpkb-fc').checked,
                    "stnk_fc": document.getElementById('stnk-fc').checked,
                    "ktp_fc": document.getElementById('ktp-fc').checked
                },
                "status_proses": document.getElementById('status_proses').value || "Berkas Diterima", // Perbaikan typo ID
                "catatan": document.getElementById('catatan').value
            }
        ]
    };

    //Kirim data ke server Node.js menggunakan fetch API
    fetch('/simpan-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProjectBaru)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Sukses! " + data.message);
            projectForm.reset();
            kekuranganBiayaInput.value = 0;
        } else {
            alert("Gagal: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan sistem saat menyimpan data.");
    });
});
