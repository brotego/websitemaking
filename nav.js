document.addEventListener('DOMContentLoaded', function() {
    // Load navigation HTML
    fetch('nav.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('nav-placeholder').innerHTML = html;
            initializeDropdown();
        })
        .catch(error => console.error('Error loading navigation:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initializeDropdown() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
    }
}

function initializeFooter() {
    const bottomContainer = document.querySelector('.bottom-container');
    const arrow = document.querySelector('.arrow-container');
    let isVisible = false;

    // Both desktop and mobile arrow click behavior
    if (arrow) {
        arrow.addEventListener('click', () => {
            isVisible = !isVisible;
            arrow.classList.toggle('up');
            bottomContainer.classList.toggle('visible');
        });
    }
}