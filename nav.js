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
    let scrollTimeout;

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const threshold = isIOS ? 50 : 5; // Larger threshold for iOS

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
        // Add touch event listeners for iOS
        if (isIOS) {
            document.addEventListener('touchmove', checkScroll, { passive: true });
            document.addEventListener('touchend', checkScroll, { passive: true });
        }

        // Regular scroll event
        window.addEventListener('scroll', checkScroll, { passive: true });

        function checkScroll() {
            // Clear any existing timeout
            clearTimeout(scrollTimeout);

            // Set a new timeout
            scrollTimeout = setTimeout(() => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // More generous threshold for iOS
                const atBottom = (windowHeight + scrollTop) >= (documentHeight - threshold);

                if (atBottom && !isVisible) {
                    isVisible = true;
                    bottomContainer.classList.add('visible');
                } else if (!atBottom && isVisible) {
                    isVisible = false;
                    bottomContainer.classList.remove('visible');
                }
            }, isIOS ? 50 : 0); // Small delay for iOS, none for others
        }

        // Check initial position
        const initialScroll = window.pageYOffset || document.documentElement.scrollTop;
        const initialHeight = window.innerHeight;
        const initialDocHeight = document.documentElement.scrollHeight;
        
        if ((initialHeight + initialScroll) >= (initialDocHeight - threshold)) {
            isVisible = true;
            bottomContainer.classList.add('visible');
        }
    }
}