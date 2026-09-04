document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen form berdasarkan ID
    const formDuplikat = document.getElementById('form_duplikat_stnk'); // Sesuaikan ID form di HTML kamu

    if (formDuplikat) {
        formDuplikat.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah reload halaman saat submit

            // 2. Ambil kelengkapan berkas yang dicentang (Checkbox)
            const berkasChecked = [];
            const checkboxes = formDuplikat.querySelectorAll('input[name="kelengkapan_berkas"]:checked');
            checkboxes.forEach(cb => {
                berkasChecked.push(cb.value);
            });

            // 3. Susun data JSON dari inputan form
            const formData = {
                nama_konsumen: document.getElementById('nama_konsumen').value,
                nomor_hp_konsumen: document.getElementById('nomor_hp_konsumen').value,
                tanggal_masuk: document.getElementById('tanggal_masuk').value,
                nomor_polisi: document.getElementById('nomor_polisi').value,
                total_biaya: parseFloat(document.getElementById('total_biaya').value) || 0,
                dp_dibayar: parseFloat(document.getElementById('dp_dibayar').value) || 0,
                kekurangan_biaya: parseFloat(document.getElementById('kekurangan_biaya').value) || 0,
                kelengkapan_berkas: berkasChecked,
                mitra_pengerjaan: document.getElementById('mitra_pengerjaan').value,
                catatan: document.getElementById('catatan').value
            };

            try {
                // 4. Kirim data ke backend PHP
                const response = await fetch('../folder_php/simpan_duplikat_stnk.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    alert('Data Duplikat STNK berhasil disimpan!');
                    formDuplikat.reset(); // Kosongkan form setelah berhasil
                } else {
                    alert('Gagal menyimpan data: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan jaringan/server.');
            }
        });
    }
});