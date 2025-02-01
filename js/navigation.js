// Immediately invoke setup code
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log

    // Navigation setup
    const navItems = document.querySelectorAll('a.nav-item[data-shortcut], div.nav-item[data-shortcut]');
    console.log('Found nav items:', navItems.length); // Debug log

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        console.log('Key pressed:', e.key); // Debug log

        // Ignore if typing in input
        if (e.target.matches('input, textarea')) return;

        // Handle number keys 1-7
        if (/^[1-7]$/.test(e.key)) {
            const navItem = document.querySelector(`.nav-item[data-shortcut="${e.key}"]`);
            if (navItem) {
                e.preventDefault();
                console.log('Clicking nav item:', navItem); // Debug log
                if (navItem.href) {
                    window.location.href = navItem.href;
                } else {
                    navItem.click();
                }
            }
        }

        // Handle search shortcut
        if (e.key === '/') {
            e.preventDefault();
            const searchTrigger = document.querySelector('[data-search="true"]');
            if (searchTrigger) {
                searchTrigger.click();
            }
        }
    });

    // Search functionality
    const searchTrigger = document.querySelector('[data-search="true"]');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.querySelector('.search-input');

    if (searchTrigger && searchOverlay && searchInput) {
        console.log('Search elements found'); // Debug log

        // Show search
        searchTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        });

        // Hide search
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Navigation System Class
export class Navigation {
    constructor() {
        // More specific selector to match both desktop and mobile nav items
        this.navItems = document.querySelectorAll('a.nav-item[data-shortcut], div.nav-item[data-shortcut]');
        this.setupKeyboardShortcuts();

        // Debug log to verify items are found
        console.log('Navigation items found:', this.navItems.length);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Debug log
            console.log('Key pressed:', e.key);

            // Ignore if user is typing in an input
            if (e.target.matches('input, textarea')) {
                return;
            }

            // Handle number keys 1-7
            if (/^[1-7]$/.test(e.key)) {
                const navItem = Array.from(this.navItems).find(item => item.dataset.shortcut === e.key);
                if (navItem) {
                    e.preventDefault();
                    console.log('Navigating to:', navItem.href || 'trigger item');
                    if (navItem.href) {
                        window.location.href = navItem.href;
                    } else {
                        navItem.click();
                    }
                }
            }
        });
    }
}