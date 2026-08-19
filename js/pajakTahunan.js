const form = document.getElementById('formPajakTahunan');

form.addEventListener('submit', async function (event) {

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
        "bpkb_fc": document.getElementById('bpkb-fc').checked,
        "stnk_fc": document.getElementById('stnk-fc').checked,
        "ktp_fc": document.getElementById('ktp-fc').checked
    }
    const mitraPengerjaan = document.getElementById('mitra').value;
    const catatan = document.getElementById('catatan').value;

    const dataBerkas = {
        nama_konsumen: namaKonsumen,
        tanggal_masuk: tanggalMasuk,
        nomor_polisi: nomorPolisi,
        total_biaya: totalBiaya,
        dp_dibayar: DP,
        kekurangan_biaya: kekuranganBiaya,
        kelengkapan_berkas: kelengkapanBerkas,
        mitra_pengerjaan: mitraPengerjaan,
        catatan: catatan
    };

    try {
        const response = await fetch('../folder_php/simpan_pajak_tahunan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBerkas)
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            form.reset();
            document.getElementById('nama_konsumen').value = ''
        } else {
            alert("Gagal: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan koneksi ke server");
    }  
})