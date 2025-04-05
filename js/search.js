// Search System Class
export class SearchSystem {
    constructor() {
        console.log('Initializing search system');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.querySelector('.search-input');
        this.searchTriggers = document.querySelectorAll('[data-search="true"]');
        this.searchResults = document.querySelector('.search-results');
        this.searchButton = document.querySelector('.search-button');
        this.searchIndex = null;

        console.log('Search elements:', {
            overlay: this.searchOverlay,
            input: this.searchInput,
            triggers: this.searchTriggers.length,
            results: this.searchResults,
            button: this.searchButton
        });

        this.init();
        this.loadSearchIndex();
    }

    async loadSearchIndex() {
        try {
            console.log('Loading search data from ./data/searchData.json');
            const response = await fetch('./data/searchData.json');
            const data = await response.json();
            
            // Store the items array from the JSON file
            this.searchIndex = data.items || [];
            
            console.log('Search index loaded:', this.searchIndex.length, 'items');
        } catch (error) {
            console.error('Error loading search index:', error);
        }
    }

    init() {
        console.log('Initializing search functionality');
        
        // Check if search elements exist
        if (!this.searchOverlay) {
            console.error('Search overlay not found');
            return;
        }
        
        if (!this.searchInput) {
            console.error('Search input not found');
            return;
        }
        
        if (!this.searchTriggers || this.searchTriggers.length === 0) {
            console.error('No search triggers found with [data-search="true"]');
            return;
        }
        
        console.log('Search elements found, setting up event listeners');

        // Add click event listener to all search triggers
        this.searchTriggers.forEach(trigger => {
            console.log('Adding click listener to search trigger:', trigger);
            trigger.addEventListener('click', (e) => {
                console.log('Search trigger clicked');
                e.preventDefault();
                this.showSearch();
            });
        });

        // Close on overlay click
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.hideSearch();
            }
        });

        // Handle search button click
        if (this.searchButton) {
            this.searchButton.addEventListener('click', () => {
                this.handleSearch();
            });
        }

        // Handle enter key in search input
        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Handle escape key to close search
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
                this.hideSearch();
            }
        });
        
        // Also handle the '/' key for search
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.showSearch();
            }
        });
    }

    showSearch() {
        console.log('Showing search overlay');
        if (this.searchOverlay) {
            this.searchOverlay.classList.add('active');
            this.searchInput?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Search overlay element not found');
        }
    }

    hideSearch() {
        this.searchOverlay?.classList.remove('active');
        if (this.searchInput) this.searchInput.value = '';
        if (this.searchResults) this.searchResults.innerHTML = '';
        document.body.style.overflow = '';
    }

    handleSearch() {
        const query = this.searchInput.value;
        console.log('Searching for:', query);
        console.log('Search index:', this.searchIndex);

        if (!query.trim()) {
            this.searchResults.innerHTML = '<div class="no-results">Please enter a search term</div>';
            return;
        }

        const results = this.performSearch(query);
        console.log('Search results:', results);
        this.displayResults(results);
    }

    performSearch(query) {
        if (!this.searchIndex || !query.trim()) {
            return [];
        }

        query = query.toLowerCase();
        return this.searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const descriptionMatch = item.description.toLowerCase().includes(query);
            const tagMatch = item.tags.some(tag =>
                tag.toLowerCase().includes(query)
            );
            return titleMatch || descriptionMatch || tagMatch;
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
                <span class="search-result-content">${result.description}</span>
                <span class="search-result-url">${result.url}</span>
            </a>
        `).join('');
    }
}