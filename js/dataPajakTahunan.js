document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen tbody dari HTML berdasarkan ID
    const tabelBody = document.getElementById('tabel_pajak_body');

    // 2. Buat fungsi untuk mengambil data dari PHP
    async function muatDataPajak() {
        try {
            // Panggil API backend PHP
            const response = await fetch('../folder_php/get_pajak_tahunan.php');
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }

            const dataPajak = await response.json();

            // Kosongkan tabel terlebih dahulu
            tabelBody.innerHTML = '';

            // Jika data kosong di database (colspan diubah jadi 12)
            if (dataPajak.length === 0) {
                tabelBody.innerHTML = `<tr><td colspan="12" style="text-align:center;">Belum ada data transaksi.</td></tr>`;
                return;
            }

            // 3. Looping data array dari PHP ke dalam baris tabel (HTML)
            dataPajak.forEach((item, index) => {
                // Parse data berkas (JSON String) jika berupa array
                let daftarBerkas = '-';
                try {
                    const berkasArr = typeof item.kelengkapan_berkas === 'string' 
                        ? JSON.parse(item.kelengkapan_berkas) 
                        : item.kelengkapan_berkas;
                        
                    if (Array.isArray(berkasArr)) {
                        daftarBerkas = berkasArr.join(', ');
                    }
                } catch (e) {
                    daftarBerkas = item.kelengkapan_berkas || '-';
                }

                // Buat baris <tr>
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.nama_konsumen}</td>
                    <td>${item.nomor_hp_konsumen}</td>
                    <td>${item.tanggal_masuk}</td>
                    <td>${item.nomor_polisi}</td>
                    <td>Rp ${Number(item.total_biaya).toLocaleString('id-ID')}</td>
                    <td>Rp ${Number(item.dp_dibayar).toLocaleString('id-ID')}</td>
                    <td>Rp ${Number(item.kekurangan_biaya).toLocaleString('id-ID')}</td>
                    <td>${daftarBerkas}</td>
                    <td>${item.mitra_pengerjaan}</td>
                    <td>${item.catatan || '-'}</td>
                    <td>
                        <button class="btn-hapus" onclick="hapusData(${item.id})">
                            <i class="fa-solid fa-trash"></i> Hapus
                        </button>
                    </td>
                `;

                // Masukkan baris ke dalam tbody
                tabelBody.appendChild(tr);
            });

        } catch (error) {
            console.error('Error:', error);
            // colspan diubah jadi 12
            tabelBody.innerHTML = `<tr><td colspan="12" style="text-align:center; color:red;">Gagal memuat data: ${error.message}</td></tr>`;
        }
    }

    // Jalankan fungsi
    muatDataPajak();
});

// Fungsi Hapus dipanggil secara global oleh event onclick HTML
async function hapusData(id) {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data transaksi ini?");
    
    if (!konfirmasi) return;

    try {
        const response = await fetch('../folder_php/hapus_pajak_tahunan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            alert('Data berhasil dihapus!');
            location.reload(); 
        } else {
            alert('Gagal menghapus data: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan jaringan.');
    }
}