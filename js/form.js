const semuaMenu = document.querySelectorAll('.item-project');
const jendelaForm = document.getElementById('formFrame');

semuaMenu.forEach(menu => {
    menu.addEventListener('click', () => {

        const formPajakTahunan = menu.getAttribute('data-form');

        if (formPajakTahunan) {
            jendelaForm.src = formPajakTahunan;
        }
    })
})