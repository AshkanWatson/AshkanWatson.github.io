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

    hamburgerBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        categoriesMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (categoriesMenu && !categoriesMenu.contains(e.target)) {
            categoriesMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the dropdown
    document.querySelector('.categories-dropdown')?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle product selection and content update
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function updateStoreContent() {
        const product = getQueryParam('product');
        if (product) {
            const productData = {
                'buy-me-coffee': {
                    title: 'Buy Me Coffee',
                    description: 'Support my work',
                    icon: './images/buy.svg',
                    price: '$29',
                    type: 'Donation',
                    deliverable: 'Donation Page'
                },
                'notion-template': {
                    title: 'Notion Template Pack',
                    description: 'Productivity tools',
                    icon: './images/notion.svg',
                    price: '$39',
                    type: 'Template',
                    deliverable: 'Notion Files'
                },
                'watson-store': {
                    title: 'Watson Store Template',
                    description: 'E-commerce template',
                    icon: './images/store.svg',
                    price: '$49',
                    type: 'Template',
                    deliverable: 'Framer File'
                }
            };

            const currentProduct = productData[product];
            if (currentProduct) {
                // Update current product display
                document.getElementById('currentProductIcon').src = currentProduct.icon;
                document.getElementById('currentProductTitle').textContent = currentProduct.title;
                document.getElementById('currentProductDesc').textContent = currentProduct.description;

                // Update main content
                document.querySelector('.store-title').textContent = currentProduct.title;
                document.querySelector('.detail-value').textContent = currentProduct.price;
                document.querySelector('.btn-primary').textContent = `Buy for ${currentProduct.price}`;
            }
        }
    }

    // Call the function when page loads
    updateStoreContent();
}); 