document.addEventListener('DOMContentLoaded', () => {
    const currentItem = document.querySelector('.current-item');
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollProgress = () => {
        const scrollPosition = lastScrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const startOffset = window.innerHeight * 0.2;

        // Calculate progress (0 to 1)
        let progress = (scrollPosition - startOffset) / (maxScroll * 0.3);
        progress = Math.max(0, Math.min(1, progress));

        // Update CSS custom property
        currentItem.style.setProperty('--scroll-progress', progress);

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });

            ticking = true;
        }
    }, { passive: true });

    // Categories menu functionality
    const categoriesMenu = document.querySelector('.categories-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        categoriesMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!categoriesMenu.contains(e.target)) {
            categoriesMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the dropdown
    document.querySelector('.categories-dropdown').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}); 