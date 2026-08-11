const semuaMenu = document.querySelectorAll('.item-project');
const jendelaForm = document.getElementById('formFrame');

semuaMenu.forEach(menu => {
    menu.addEventListener('click', () => {

        const namaForm = menu.getAttribute('data-form');

        if (namaForm) {
            jendelaForm.src = namaForm;
        }
    })
})