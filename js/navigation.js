document.addEventListener('keydown', (event) => {
    // Convert key to string and handle both numpad and regular numbers
    const key = event.key.toString();
    
    // Check if user is typing in an input field
    if (event.target.matches('input, textarea')) return;
    
    // Handle number keys 1-7
    if (/^[1-7]$/.test(key)) {
        const navItem = document.querySelector(`.nav-item[data-shortcut="${key}"]`);
        if (navItem) {
            event.preventDefault();
            navItem.click();
        }
    }
    
    // Handle forward slash for search
    if (key === '/') {
        event.preventDefault();
        const searchTrigger = document.querySelector('.search-trigger');
        if (searchTrigger) {
            searchTrigger.click();
        }
    }
}); 