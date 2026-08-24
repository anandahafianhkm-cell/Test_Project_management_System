const form = document.getElementById('formPajak5Tahunan');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const namaKonsumen = document.getElementById('nama_konsumen').value;

    if (!namaKonsumen) {
        alert("Nama Konsumen Wajib Diisi");
        return;
    }

    const tanggalMasuk = document.getElementById('tanggal_masuk').value;
})