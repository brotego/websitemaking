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
    let lastScrollTop = 0;

    // Desktop arrow click behavior
    if (arrow && window.innerWidth > 600) {
        arrow.addEventListener('click', () => {
            isVisible = !isVisible;
            arrow.classList.toggle('up');
            bottomContainer.classList.toggle('visible');
        });
    }

    // Mobile scroll behavior
    if (window.innerWidth <= 600) {
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrolledToBottom = (windowHeight + st) >= (documentHeight - 20);

            // Scrolling down
            if (st > lastScrollTop) {
                if (scrolledToBottom && !isVisible) {
                    isVisible = true;
                    bottomContainer.classList.add('visible');
                }
            } 
            // Scrolling up
            else {
                if (!scrolledToBottom && isVisible) {
                    isVisible = false;
                    bottomContainer.classList.remove('visible');
                }
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });

        // Check initial position
        const initialScroll = window.pageYOffset || document.documentElement.scrollTop;
        const initialHeight = window.innerHeight;
        const initialDocHeight = document.documentElement.scrollHeight;
        
        if ((initialHeight + initialScroll) >= (initialDocHeight - 20)) {
            isVisible = true;
            bottomContainer.classList.add('visible');
        }
    }
}