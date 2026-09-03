document.addEventListener('DOMContentLoaded', () => {
    const tabelBody = document.getElementById('tabel_pajak_5tahunan_body');

    async function muatDataPajak5Tahunan() {
        try {
            // Panggil backend PHP untuk Pajak 5 Tahunan
            const response = await fetch('../folder_php/get_pajak_5tahunan.php');
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }

            const dataPajak = await response.json();

            tabelBody.innerHTML = '';

            if (dataPajak.length === 0) {
                tabelBody.innerHTML = `<tr><td colspan="11" style="text-align:center;">Belum ada data transaksi Pajak 5 Tahunan.</td></tr>`;
                return;
            }

            dataPajak.forEach((item, index) => {
                // Formatting data berkas (JSON array to string)
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
                `;

                tabelBody.appendChild(tr);
            });

        } catch (error) {
            console.error('Error:', error);
            tabelBody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:red;">Gagal memuat data: ${error.message}</td></tr>`;
        }
    }

    muatDataPajak5Tahunan();
});