const form = document.getElementById('formPajakTahunan');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const namaKonsumen = document.getElementById('nama_konsumen').value;
    const tanggalMasuk = document.getElementById('tanggal_masuk').value;
    const nomorPolisi = document.getElementById('nomor_polisi').value;
    const totalBiaya = document.getElementById('total_biaya').value;
    const DP = document.getElementById('dp_dibayar').value;
    const kekuranganBiaya = document.getElementById('kekurangan_biaya').value;
    const kelengkapanBerkas = {
        "bpkb_asli": document.getElementById('bpkb-asli').checked,
        "stnk_asli": document.getElementById('stnk-asli').checked,
        "ktp_asli": document.getElementById('ktp-asli').checked,
        "bpkb_fc": document.getElementById('bpkb-fc').checked,
        "stnk_fc": document.getElementById('stnk-fc').checked,
        "ktp_fc": document.getElementById('ktp-fc').checked
    }
    const mitraPengerjaan = document.getElementById('mitra');
    const catatan = document.getElementById('catatan').value;

    const dataBerkas = {
        nama_konsumen: namaKonsumen,
        tanggal_masuk: tanggalMasuk,
        nomor_polisi: nomorPolisi,
        total_biaya: totalBiaya,
        DP: DP,
        kekurangan_biaya: kekuranganBiaya,
        kelengkapan_berkas: kelengkapanBerkas,
        mitra_pengerjaan: mitraPengerjaan,
        catatan: catatan
    };

    const dataJSON = JSON.stringify(dataBerkas);
    
    console.log(dataBerkas);
    console.log(dataJSON);
})