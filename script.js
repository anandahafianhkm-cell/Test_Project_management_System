// Ambil semua elemen form yang dibutuhkan dari HTML
const totalBiayaInput = document.getElementById('total_biaya');
const dpDibayarInput = document.getElementById('dp_dibayar');
const kekuranganBiayaInput = document.getElementById('kekurangan_biaya');
const projectForm = document.getElementById('projectForm');

// Fungsi Hitung Otomatis Kekurangan Biaya
function hitungKekurangan() {
    const total = parseFloat(totalBiayaInput.value) || 0;
    const dp = parseFloat(dpDibayarInput.value) || 0;

    //Rumus Hitung Sisa Kekurangan
    const kekurangan = total - dp;

    //Tampilkan hasil hitungan ke kolom kekurangan biaya
    kekuranganBiayaInput.value = kekurangan;
}

totalBiayaInput.addEventListener('input', hitungKekurangan);
dpDibayarInput.addEventListener('input', hitungKekurangan);

