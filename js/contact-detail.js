document.addEventListener('DOMContentLoaded', () => {
    // Copy email functionality
    const copyEmailBtn = document.querySelector('.btn-secondary');
    const email = 'your.email@example.com'; // Replace with your email

    copyEmailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);

            // Temporarily change button text to show success
            const originalText = copyEmailBtn.innerHTML;
            copyEmailBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
            `;

            setTimeout(() => {
                copyEmailBtn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    });

    // Search functionality
    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');

    // Open search with keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Open search with click
    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
    });

    // Close search when clicking outside
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    function openSearch() {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        document.body.style.overflow = '';
    }

    // Search input handling
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Add your search logic here
        // You can populate .search-results based on the query
    });
}); 