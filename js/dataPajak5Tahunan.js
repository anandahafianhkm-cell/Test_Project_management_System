document.addEventListener('DOMContentLoaded', () => {
    const tabelBody = document.getElementById('tabel_pajak_5tahunan_body');

    // Buat fungsi muat data ini secara global agar bisa dipanggil setelah hapus
    window.muatDataPajak5Tahunan = async function() {
        try {
            const response = await fetch('../folder_php/get_pajak_5tahunan.php?t=' + new Date().getTime()); // Pakai timestamp biar gak di-cache browser
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server');
            }

            const dataPajak = await response.json();
            tabelBody.innerHTML = '';

            if (dataPajak.length === 0) {
                tabelBody.innerHTML = `<tr><td colspan="12" style="text-align:center;">Belum ada data transaksi Pajak 5 Tahunan.</td></tr>`;
                return;
            }

            dataPajak.forEach((item, index) => {
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
                    <td>
                        <button class="btn-hapus" onclick="hapusData(${item.id})">
                            <i class="fa-solid fa-trash"></i> Hapus
                        </button>
                    </td>
                `;

                tabelBody.appendChild(tr);
            });

        } catch (error) {
            console.error('Error:', error);
            tabelBody.innerHTML = `<tr><td colspan="12" style="text-align:center; color:red;">Gagal memuat data: ${error.message}</td></tr>`;
        }
    };

    // Panggil saat halaman pertama kali dimuat
    window.muatDataPajak5Tahunan();
});

// Fungsi Hapus Data
async function hapusData(id) {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data transaksi ini?");
    
    if (!konfirmasi) return;

    try {
        // PERHATIKAN: Pastikan mengarah ke hapus_pajak_5tahunan.php
        const response = await fetch('../folder_php/hapus_pajak_5tahunan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
            alert('Data berhasil dihapus!');
            // Panggil ulang fungsi pemuat data tanpa reload halaman
            if (typeof window.muatDataPajak5Tahunan === 'function') {
                window.muatDataPajak5Tahunan();
            } else {
                location.reload();
            }
        } else {
            alert('Gagal menghapus data: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan jaringan.');
    }
}