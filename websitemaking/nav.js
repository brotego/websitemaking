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
    const footer = document.querySelector('.footer');
    const arrow = document.querySelector('.arrow-container');
    let footerVisible = false;

    // Desktop behavior with arrow
    if (arrow && window.innerWidth > 600) {
        arrow.addEventListener('click', () => {
            footerVisible = !footerVisible;
            arrow.classList.toggle('up');
            footer.classList.toggle('visible');
        });
    }

    // Mobile behavior - show footer at bottom of scroll
    if (window.innerWidth <= 600) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if ((windowHeight + scrollTop) >= (documentHeight - 10)) {
                if (!footerVisible) {
                    footerVisible = true;
                    footer.classList.add('visible');
                }
            } else {
                if (footerVisible) {
                    footerVisible = false;
                    footer.classList.remove('visible');
                }
            }
        });
    }
}