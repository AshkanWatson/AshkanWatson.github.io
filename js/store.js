document.addEventListener('DOMContentLoaded', () => {
    const currentItem = document.querySelector('.current-item');
    let ticking = false;
    let lastScrollY = window.scrollY;

    // Scroll progress functionality
    const updateScrollProgress = () => {
        const scrollPosition = lastScrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const startOffset = window.innerHeight * 0.2;

        let progress = (scrollPosition - startOffset) / (maxScroll * 0.3);
        progress = Math.max(0, Math.min(1, progress));

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

    // Store items navigation functionality
    const nowViewingContainer = document.querySelector('.now-viewing .current-item');
    const storeCategories = document.querySelector('.store-categories .category-items');
    const allProducts = [
        {
            id: 'buy-me-coffee',
            title: 'Buy Me Coffee',
            description: 'Support my work',
            icon: './images/buy.svg',
            price: '$29',
            type: 'Donation',
            deliverable: 'Donation Page',
            previewImage: './images/coffee-preview.jpg',
            content: {
                description: 'Support my work and help me create more useful content and tools for the community.',
                features: [
                    'Direct support for ongoing projects',
                    'Access to supporter-only updates',
                    'Name in credits of future projects',
                    'Personal thank you message'
                ]
            }
        },
        {
            id: 'notion-template',
            title: 'Notion Template',
            description: 'Productivity tools',
            icon: './images/notion.svg',
            price: '$39',
            type: 'Template',
            deliverable: 'Notion Files',
            previewImage: './images/notion-preview.jpg',
            content: {
                description: 'A comprehensive Notion template pack designed to boost your productivity and organize your workflow.',
                features: [
                    'Project management dashboard',
                    'Task tracking system',
                    'Content calendar',
                    'Goal tracking templates',
                    'Resource library organization'
                ]
            }
        },
        {
            id: 'watson-store',
            title: 'Watson Store',
            description: 'E-commerce template',
            icon: './images/store.svg',
            price: '$49',
            type: 'Template',
            deliverable: 'Framer File',
            previewImage: './images/store-preview.jpg',
            content: {
                description: 'A modern, fully responsive e-commerce template built with Framer, perfect for digital products and services.',
                features: [
                    'Responsive design system',
                    'Product showcase layouts',
                    'Shopping cart integration',
                    'Checkout process flow',
                    'Admin dashboard template'
                ]
            }
        }
    ];

    // Get current product from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentProductId = urlParams.get('product') || 'buy-me-coffee';

    // Update now viewing and categories sections
    function updateStoreNavigation(currentId) {
        // Find current product
        const currentProduct = allProducts.find(p => p.id === currentId);
        
        if (currentProduct) {
            // Update now viewing section
            nowViewingContainer.innerHTML = `
                <div class="item-icon">
                    <img src="${currentProduct.icon}" alt="${currentProduct.title} Icon" id="currentProductIcon">
                </div>
                <div class="item-content">
                    <h3>${currentProduct.title}</h3>
                    <p>${currentProduct.description}</p>
                </div>
            `;

            // Update main content
            document.querySelector('.store-title').textContent = currentProduct.title;
            document.querySelector('.detail-row .detail-value').textContent = currentProduct.price;
            document.querySelector('.btn-primary').textContent = `Buy for ${currentProduct.price}`;

            // Update preview image
            const previewImage = document.querySelector('.preview-image');
            if (previewImage) {
                previewImage.src = currentProduct.previewImage;
                previewImage.alt = `${currentProduct.title} Preview`;
            }

            // Update store content and features
            const storeContent = document.querySelector('.store-content');
            if (storeContent) {
                storeContent.innerHTML = `
                    <p>${currentProduct.content.description}</p>
                    <h2>Features</h2>
                    <ul class="feature-list">
                        ${currentProduct.content.features.map(feature => `
                            <li>${feature}</li>
                        `).join('')}
                    </ul>
                `;
            }

            // Update categories section - show only products except current
            const otherProducts = allProducts.filter(p => p.id !== currentId);
            storeCategories.innerHTML = otherProducts.map(product => `
                <a href="?product=${product.id}" class="store-item">
                    <div class="item-icon">
                        <img src="${product.icon}" alt="${product.title} Icon">
                    </div>
                    <div class="item-content">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                    </div>
                </a>
            `).join('');

            // Add click handlers to store items
            addStoreItemClickHandlers();
        }
    }

    // Handle clicks on store items
    function addStoreItemClickHandlers() {
        const storeItems = document.querySelectorAll('.store-item');
        storeItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = new URLSearchParams(item.href.split('?')[1]).get('product');
                if (productId) {
                    updateStoreNavigation(productId);
                    window.history.pushState({}, '', `?product=${productId}`);
                }
            });
        });
    }

    // Initial update
    updateStoreNavigation(currentProductId);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const newProductId = new URLSearchParams(window.location.search).get('product') || 'buy-me-coffee';
        updateStoreNavigation(newProductId);
    });

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
});