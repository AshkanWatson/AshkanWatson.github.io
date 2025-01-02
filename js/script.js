// Utility Functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Navigation System
class Navigation {
    constructor() {
        this.items = $$('.nav-item');
        this.setupKeyboardShortcuts();
        this.setupNavigationHighlight();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if user is typing in an input
            if (e.target.matches('input, textarea')) return;

            this.items.forEach(item => {
                const shortcut = item.dataset.shortcut;
                if (shortcut === e.key) {
                    e.preventDefault();
                    if (item.href) {
                        window.location.href = item.href;
                    } else {
                        item.click();
                    }
                }
            });
        });
    }

    setupNavigationHighlight() {
        const currentPath = window.location.pathname;
        this.items.forEach(item => {
            if (item.href && item.href.endsWith(currentPath)) {
                item.classList.add('active');
            }
        });
    }
}

// Search System
class SearchSystem {
    constructor() {
        this.modal = $('.search-modal');
        this.input = $('.search-input');
        this.results = $('.search-results');
        this.searchTrigger = $('.search-trigger');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open search with trigger click
        this.searchTrigger.addEventListener('click', () => this.openSearch());

        // Open search with '/' key
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.openSearch();
            }
        });

        // Close with Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeSearch();
        });

        // Close when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeSearch();
        });

        // Search input handler
        this.input.addEventListener('input', () => this.handleSearch());
    }

    openSearch() {
        this.modal.hidden = false;
        requestAnimationFrame(() => {
            this.modal.dataset.visible = 'true';
            this.input.focus();
        });
    }

    closeSearch() {
        this.modal.dataset.visible = 'false';
        setTimeout(() => {
            this.modal.hidden = true;
            this.input.value = '';
            this.results.innerHTML = '';
        }, 300);
    }

    async handleSearch() {
        const query = this.input.value.trim();
        if (!query) {
            this.results.innerHTML = '';
            return;
        }

        // Example search implementation
        // Replace with your actual search logic
        const results = await this.performSearch(query);
        this.displayResults(results);
    }

    async performSearch(query) {
        // Example search implementation
        // Replace with your actual search logic
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { title: 'Example Result 1', url: '#' },
                    { title: 'Example Result 2', url: '#' }
                ].filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                ));
            }, 100);
        });
    }

    displayResults(results) {
        this.results.innerHTML = results.length ?
            results.map(result => `
                <a href="${result.url}" class="search-result">
                    ${result.title}
                </a>
            `).join('') :
            '<div class="no-results">No results found</div>';
    }
}

// Animation System
class AnimationSystem {
    constructor() {
        this.setupAppearAnimations();
    }

    setupAppearAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        $$('[data-appear]').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            observer.observe(element);
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SearchSystem();
    new AnimationSystem();
});

// Add to existing script.js
class ScrollAnimation {
    constructor() {
        this.projectNav = $('.project-nav');
        if (!this.projectNav) return;

        this.lastScrollTop = 0;
        this.setupScrollListener();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDiff = scrollTop - this.lastScrollTop;

            // Calculate new offset (with limits)
            const currentOffset = parseFloat(getComputedStyle(this.projectNav)
                .getPropertyValue('--scroll-offset').replace('px', '') || 0);
            const newOffset = Math.max(
                Math.min(currentOffset - scrollDiff, 0),
                -Math.max(0, document.documentElement.scrollHeight - window.innerHeight - 100)
            );

            this.projectNav.style.setProperty('--scroll-offset', `${newOffset}px`);
            this.lastScrollTop = scrollTop;
        });
    }
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {  
    new Navigation();
    new SearchSystem();
    new AnimationSystem();
    new ScrollAnimation(); // Add this line
});