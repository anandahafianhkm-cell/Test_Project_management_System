const form = document.getElementById('formPajak5Tahunan');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const namaKonsumen = document.getElementById('nama_konsumen').value;

    if (!namaKonsumen) {
        alert("Nama Konsumen Wajib Diisi");
        return;
    }

    const tanggalMasuk = document.getElementById('tanggal_masuk').value;
    const nomorPolisi = document.getElementById('nomor_polisi').value;
    const totalBiaya = parseFloat(document.getElementById('total_biaya').value) || 0;
    const DP = parseFloat(document.getElementById('dp_dibayar').value) || 0;
    const kekuranganBiaya = parseFloat(document.getElementById('kekurangan_biaya').value) || 0;
    const kelengkapanBerkas = {
        "bpkb_asli": document.getElementById('bpkb-asli').checked,
        "stnk_asli": document.getElementById('stnk-asli').checked,
        "ktp_asli": document.getElementById('ktp-asli').checked,
        "bpkb-fc": document.getElementById('bpkb-fc').checked,
        "stnk_fc": document.getElementById('stnk-fc').checked,
        "ktp_fc": document.getElementById('ktp-fc').checked
    }

    const mitraPengerjaan = document.getElementById('mitra').value;
    const catatan = document.getElementById('catatan').value;
})