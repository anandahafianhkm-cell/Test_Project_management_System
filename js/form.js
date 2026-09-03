const semuaMenu = document.querySelectorAll('.item-project');
const jendelaForm = document.getElementById('formFrame');

semuaMenu.forEach(menu => {
    menu.addEventListener('click', () => {

        const namaForm = menu.getAttribute('data-form');

        if (namaForm) {
            jendelaForm.src = namaForm;

            semuaMenu.forEach(m => m.classList.remove('aktif'));
            menu.classList.add('aktif');
        }
    });
});