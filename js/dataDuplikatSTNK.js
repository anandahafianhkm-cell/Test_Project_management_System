document.addEventListener('DOMContentLoaded', () => {
    const tabelBody = document.getElementById('tabel_duplikat_stnk_body');

    window.muatDataDuplikatSTNK = async function() {
        try {
            const response = await fetch('../folder_php/get_duplikat_stnk.php?t=' + new Date().getTime());
            if (!response.ok) throw new Error('Gagal mengambil data');

            const data = await response.json();
            tabelBody.innerHTML = '';

            if (data.length === 0) {
                tabelBody.innerHTML = `<tr><td colspan="12" style="text-align:center;">Belum ada data transaksi Duplikat STNK.</td></tr>`;
                return;
            }

            data.forEach((item, index) => {
                let daftarBerkas = '-';
                try {
                    const berkasArr = typeof item.kelengkapan_berkas === 'string' ? JSON.parse(item.kelengkapan_berkas) : item.kelengkapan_berkas;
                    if (Array.isArray(berkasArr)) daftarBerkas = berkasArr.join(', ');
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

    window.muatDataDuplikatSTNK();
});

async function hapusData(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data transaksi ini?")) return;

    try {
        const response = await fetch('../folder_php/hapus_duplikat_stnk.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        const result = await response.json();
        if (response.ok && result.status === 'success') {
            alert('Data berhasil dihapus!');
            if (typeof window.muatDataDuplikatSTNK === 'function') {
                window.muatDataDuplikatSTNK();
            } else {
                location.reload();
            }
        } else {
            alert('Gagal menghapus: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan jaringan.');
    }
}