// Import utilities and constants
import { utils } from './utils.js';
import { animations } from './animations.js';
import { CONSTANTS } from './constants.js';
import { initForm } from './form.js';
import { initLazyLoading } from './lazyLoad.js';
import { fadeIn, slideIn } from './animations.js';
import { debounce } from './utils.js';

// Main application functionality
const App = {
    // Cache DOM elements
    elements: {
        searchBtn: null,
        navItems: null,
        forms: null
    },

    // Initialize the application
    init() {
        this.cacheElements();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },

    // Cache frequently used elements
    cacheElements() {
        this.elements.searchBtn = document.querySelector('.search-btn');
        this.elements.navItems = document.querySelectorAll('.nav-item');
        this.elements.forms = document.querySelectorAll('form');
    },

    // Setup event listeners and initialize features
    setup() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.setupIntersectionObserver();
        this.initializeAnimations();
    },

    // Set up event listeners with delegation
    setupEventListeners() {
        // Event delegation for better performance
        document.addEventListener('click', (e) => {
            const { target } = e;
            
            // Handle search button
            if (target.matches('.search-btn')) {
                this.handleSearch();
            }

            // Handle navigation items
            if (target.matches('.nav-item')) {
                this.handleNavigation(target);
            }
        });

        // Handle form submissions
        this.elements.forms?.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });
    },

    // Set up keyboard shortcuts
    setupKeyboardShortcuts() {
        const debouncedKeyHandler = utils.debounce((e) => {
            const { KEYBOARD_SHORTCUTS } = CONSTANTS;

            // Search shortcut
            if (e.key === KEYBOARD_SHORTCUTS.SEARCH) {
                e.preventDefault();
                this.handleSearch();
            }

            // Navigation shortcuts
            if (KEYBOARD_SHORTCUTS.NAVIGATION.includes(e.key)) {
                const index = parseInt(e.key) - 1;
                this.elements.navItems[index]?.click();
            }
        }, 150);

        document.addEventListener('keydown', debouncedKeyHandler);
    },

    // Set up intersection observer for lazy loading
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    },

    // Initialize animations
    initializeAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            const animationType = element.dataset.animate;
            if (animations[animationType]) {
                element.style.transition = `all ${animations.transition.duration}s ${animations.transition.ease}`;
                element.addEventListener('mouseenter', () => {
                    Object.assign(element.style, animations[animationType]);
                });
                element.addEventListener('mouseleave', () => {
                    Object.assign(element.style, { transform: 'none' });
                });
            }
        });
    },

    // Event Handlers
    handleSearch: utils.debounce(function() {
        console.log('Search triggered');
        // Implement search functionality
    }, 300),

    handleNavigation(target) {
        // Remove active class from all nav items
        this.elements.navItems?.forEach(item => item.classList.remove('active'));
        // Add active class to clicked item
        target.classList.add('active');
    },

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate form data
        const email = formData.get('email');
        if (email && !utils.validateEmail(email)) {
            console.error('Invalid email');
            return;
        }

        // Process form submission
        console.log('Form submitted', Object.fromEntries(formData));
    }
};

// Initialize the application
App.init();

// Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
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
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
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

export default App;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initForm();
    initLazyLoading();
    
    // Add scroll animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        slideIn(card);
    });
});

// Copy email functionality
document.querySelector('.copy-email').addEventListener('click', function() {
    const email = this.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
        this.classList.add('copied');
        setTimeout(() => {
            this.classList.remove('copied');
        }, 2000);
    });
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

// Navigation keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const shortcuts = {
        '1': '/',
        '2': '#work',
        '3': '#writing',
        '4': '#store',
        '5': '#stack',
        '6': '#about',
        '7': '#contact',
        '/': () => document.querySelector('.search-button').click()
    };

    const action = shortcuts[e.key];
    if (action) {
        e.preventDefault();
        if (typeof action === 'function') {
            action();
        } else {
            window.location.href = action;
        }
    }
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