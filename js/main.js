// Import utilities and constants
import { utils } from './utils.js';
import { animations } from './animations.js';
import { CONSTANTS } from './constants.js';
import { initForm } from './form.js';
import { initLazyLoading } from './lazyLoad.js';
import { fadeIn, slideIn } from './animations.js';
import { debounce } from './utils.js';
import { Navigation } from './navigation.js';
import { SearchSystem } from './search.js';
import { AnimationSystem } from './animations.js';

// Main application functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    // Navigation setup
    const navItems = document.querySelectorAll('a.nav-item[data-shortcut], div.nav-item[data-shortcut]');
    console.log('Found nav items:', navItems.length);

    // Load search index
    let searchIndex = null;

    async function loadSearchIndex() {
        try {
            const response = await fetch('./data/searchData.json');
            const data = await response.json();
            searchIndex = data.items;
            console.log('Search index loaded:', searchIndex.length, 'items');
        } catch (error) {
            console.error('Error loading search index:', error);
        }
    }

    // Load search index when page loads
    loadSearchIndex();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        console.log('Key pressed:', e.key);

        // Ignore if typing in input
        if (e.target.matches('input, textarea')) return;

        // Handle number keys 1-7
        if (/^[1-7]$/.test(e.key)) {
            const navItem = document.querySelector(`.nav-item[data-shortcut="${e.key}"]`);
            if (navItem) {
                e.preventDefault();
                console.log('Clicking nav item:', navItem);
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
    const searchTriggers = document.querySelectorAll('[data-search="true"]');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchResults = document.querySelector('.search-results');

    function performSearch(query) {
        if (!searchIndex || !query.trim()) {
            return [];
        }

        query = query.toLowerCase();
        return searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const descriptionMatch = item.description.toLowerCase().includes(query);
            const tagMatch = item.tags.some(tag =>
                tag.toLowerCase().includes(query)
            );
            return titleMatch || descriptionMatch || tagMatch;
        });
    }

    function displayResults(results) {
        if (!results.length) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result">
                <span class="search-result-title">${result.title}</span>
                <span class="search-result-content">${result.description}</span>
                <span class="search-result-url">${result.url}</span>
            </a>
        `).join('');
    }

    function handleSearch() {
        const query = searchInput.value;
        console.log('Searching for:', query);
        console.log('Search index:', searchIndex);

        if (!query.trim()) {
            searchResults.innerHTML = '<div class="no-results">Please enter a search term</div>';
            return;
        }

        const results = performSearch(query);
        console.log('Search results:', results);
        displayResults(results);
    }

    if (searchTriggers && searchOverlay && searchInput) {
        console.log('Search elements found');

        // Add click event listener to all search triggers
        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                searchOverlay.classList.add('active');
                searchInput.focus();
                document.body.style.overflow = 'hidden';
            });
        });

        // Hide search
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
                document.body.style.overflow = '';
            }
        });

        // Handle search button click
        searchButton?.addEventListener('click', () => {
            handleSearch();
        });

        // Handle enter key in search input
        searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Handle escape key to close search
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
                document.body.style.overflow = '';
            }
        });
    }
});

// Initialize Animation System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationSystem = new AnimationSystem();
});

// Form Handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    // You can handle the form submission here
    console.log('Form submitted:', formData);
    // Clear form
    this.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Simple Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Copy email functionality
document.addEventListener('DOMContentLoaded', () => {
    const copyEmailBtn = document.querySelector('.copy-email');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async function () {
            const email = this.getAttribute('data-email');

            try {
                await navigator.clipboard.writeText(email);

                // Visual feedback
                const originalText = this.querySelector('span').textContent;
                this.querySelector('span').textContent = 'Email copied!';
                this.classList.add('copied');

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    }
});

// Show keyboard shortcuts on Cmd/Ctrl press
document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.add('show-shortcut');
        });
    }
});

document.addEventListener('keyup', (e) => {
    if (!e.metaKey && !e.ctrlKey) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('show-shortcut');
        });
    }
});

// Utility Functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Navigation System
class Navigation {
    constructor() {
        // More specific selector to match both desktop and mobile nav items
        this.navItems = document.querySelectorAll('a.nav-item[data-shortcut], div.nav-item[data-shortcut]');
        this.setupKeyboardShortcuts();

        // Debug log to verify items are found
        console.log('Navigation items found:', this.navItems.length);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            console.log('Key pressed:', e.key);

            // Ignore if typing in input
            if (e.target.matches('input, textarea')) return;

            // Handle number keys 1-7
            if (/^[1-7]$/.test(e.key)) {
                const navItem = document.querySelector(`.nav-item[data-shortcut="${e.key}"]`);
                if (navItem) {
                    e.preventDefault();
                    console.log('Clicking nav item:', navItem);
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
    }
}

// Search System
class SearchSystem {
    constructor() {
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.querySelector('.search-input');
        this.searchButton = document.querySelector('.search-button');
        this.searchTrigger = document.querySelector('[data-search="true"]');
        this.searchResults = document.querySelector('.search-results');
        this.searchIndex = null;

        this.init();
        this.loadSearchIndex();
    }

    async loadSearchIndex() {
        try {
            const response = await fetch('./data/search-index.json');
            const data = await response.json();
            this.searchIndex = data.pages;
            console.log('Search index loaded:', this.searchIndex.length, 'items');
        } catch (error) {
            console.error('Error loading search index:', error);
        }
    }

    init() {
        // Show search on trigger click
        this.searchTrigger?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSearch();
        });

        // Close on overlay click
        this.searchOverlay?.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.hideSearch();
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Open search with '/' key
            if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.showSearch();
            }

            // Close with Escape
            if (e.key === 'Escape' && this.searchOverlay?.classList.contains('active')) {
                this.hideSearch();
            }
        });

        // Handle search input
        this.searchInput?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Add search button click handler
        this.searchButton?.addEventListener('click', () => {
            this.handleSearch(this.searchInput.value);
        });

        // Add enter key handler
        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch(e.target.value);
            }
        });
    }

    showSearch() {
        this.searchOverlay?.classList.add('active');
        this.searchInput?.focus();
        document.body.style.overflow = 'hidden';
    }

    hideSearch() {
        this.searchOverlay?.classList.remove('active');
        if (this.searchInput) this.searchInput.value = '';
        document.body.style.overflow = '';
    }

    async handleSearch(query) {
        if (!query.trim() || !this.searchIndex) {
            this.searchResults.innerHTML = '<div class="no-results">Please enter a search term</div>';
            return;
        }

        const results = this.performSearch(query.toLowerCase());
        this.displayResults(results);
    }

    performSearch(query) {
        return this.searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            const keywordMatch = item.keywords.some(keyword =>
                keyword.toLowerCase().includes(query)
            );
            return titleMatch || contentMatch || keywordMatch;
        });
    }

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        this.searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result">
                <span class="search-result-title">${result.title}</span>
                <span class="search-result-content">${result.content}</span>
                <span class="search-result-url">${result.url}</span>
            </a>
        `).join('');
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    const nav = new Navigation();
    const search = new SearchSystem();
    const animation = new AnimationSystem();

    // Debug log
    console.log('All systems initialized');
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

/* Menu Active Codes */

let targets = document.querySelectorAll('[data-target]')
targets.forEach(element => {
    element.addEventListener('click', () => {
        var target = document.querySelector(element.dataset.target)
        targets.forEach(element2 => {
            var target2 = document.querySelector(element2.dataset.target)
            element2.style.color = 'var(--menu_text_color)'
            target2.style.display = 'none'
        });
        element.style.color = 'var(--menu_active_text_color)'
        target.style.display = 'flex'
    })
})

/* * */

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SearchSystem();
    new AnimationSystem();
    new ScrollAnimation(); // Add this line
});
// Add IDs to sections for navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        'work': document.querySelector('.section.work'),
        'writing': document.querySelector('.section.writing'),
        'store': document.querySelector('.section.store'),
        'stack': document.querySelector('.section.stack'),
        'about': document.querySelector('.section.about')
    };

    // Add IDs to sections
    for (let [id, section] of Object.entries(sections)) {
        if (section) section.id = id;
    }
});

// Add this after App initialization
const mobileNav = {
    init() {
        this.hamburger = document.querySelector('.mobile-nav-toggle');
        this.sidebar = document.querySelector('.sidebar');
        this.setupEventListeners();
        this.checkScreenSize();
    },

    setupEventListeners() {
        // Toggle menu on hamburger click
        this.hamburger?.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-nav-toggle')) {
                this.closeMenu();
            }
        });

        // Handle screen resize
        window.addEventListener('resize', () => this.checkScreenSize());
    },

    toggleMenu() {
        this.sidebar.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    },

    closeMenu() {
        this.sidebar.classList.remove('active');
        this.hamburger.classList.remove('active');
    },

    checkScreenSize() {
        if (window.innerWidth > 768) {
            this.closeMenu();
        }
    }
};

// Initialize mobile navigation
mobileNav.init();

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.querySelector('.search-input');
    const searchTrigger = document.querySelector('[data-search]');

    console.log('Search elements:', { searchOverlay, searchInput, searchTrigger }); // Debug log

    // Show search overlay
    function showSearch() {
        console.log('Showing search overlay'); // Debug log
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    // Hide search overlay
    function hideSearch() {
        console.log('Hiding search overlay'); // Debug log
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (searchTrigger) {
        searchTrigger.addEventListener('click', (e) => {
            console.log('Search trigger clicked'); // Debug log
            e.preventDefault();
            showSearch();
        });
    } else {
        console.log('Search trigger not found!'); // Debug log
    }

    // Close on overlay click
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                hideSearch();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            hideSearch();
        }
    });

    // Search input handling
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Add your search logic here
        // You can populate .search-results based on the query
    });
});

// Export for use in other modules if needed
export { Navigation, SearchSystem }; 



class AnimationSystem {
    constructor() {
        this.setupAppearAnimations();
    }

    setupAppearAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
}