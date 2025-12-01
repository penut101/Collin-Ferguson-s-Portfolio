// Function to load and inject the shared header
async function loadHeader() {
    try {
        // For a flat directory structure (all files in root), we fetch header.html directly
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = headerHtml;
        
        // Find the header placeholder
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.replaceWith(...temp.children);
            
            // Normalize nav hrefs for root-level structure
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const links = document.querySelectorAll('.nav-menu a');

            links.forEach(link => {
                const orig = link.getAttribute('href') || '';
                // Skip external or mailto or pure-fragment links
                if (/^(https?:|mailto:|#)/i.test(orig)) return;

                // Keep links as-is for flat structure
                // All files are in root, so simple filenames work directly
                link.setAttribute('href', orig);
            });

            // Set active state for current page by comparing basenames
            links.forEach(link => {
                const href = link.getAttribute('href') || '';
                const basename = href.split('/').pop().split('#')[0];
                if (basename === currentPage) {
                    link.classList.add('active');
                    // If it's in a dropdown, mark the parent trigger too
                    const dropdownTrigger = link.closest('.dropdown')?.querySelector('.dropdown-trigger');
                    if (dropdownTrigger) {
                        dropdownTrigger.classList.add('active');
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
