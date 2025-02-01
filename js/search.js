// Search System Class
export class SearchSystem {
    constructor() {
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.querySelector('.search-input');
        this.searchTrigger = document.querySelector('[data-search="true"]');
        this.searchResults = document.querySelector('.search-results');
        this.searchData = null;

        this.init();
        this.loadSearchData();
    }

    async loadSearchData() {
        try {
            const response = await fetch('/data/searchData.json');
            this.searchData = await response.json();
        } catch (error) {
            console.error('Error loading search data:', error);
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
        if (!query.trim()) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = await this.performSearch(query);
        this.displayResults(results);
    }

    async performSearch(query) {
        if (!this.searchData) {
            await this.loadSearchData();
        }

        query = query.toLowerCase();
        return this.searchData.items.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const descMatch = item.description.toLowerCase().includes(query);
            const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(query));

            return titleMatch || descMatch || tagMatch;
        }).map(item => ({
            title: item.title,
            url: item.url,
            description: item.description,
            type: item.type
        }));
    }

    displayResults(results) {
        if (!results.length) {
            this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        // Group results by type
        const groupedResults = results.reduce((acc, item) => {
            acc[item.type] = acc[item.type] || [];
            acc[item.type].push(item);
            return acc;
        }, {});

        // Generate HTML for results
        const html = Object.entries(groupedResults).map(([type, items]) => `
            <div class="search-group">
                <div class="search-group-header">${type.charAt(0).toUpperCase() + type.slice(1)}s</div>
                ${items.map(item => `
                    <a href="${item.url}" class="search-result">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-description">${item.description}</div>
                    </a>
                `).join('')}
            </div>
        `).join('');

        this.searchResults.innerHTML = html;
    }
} 