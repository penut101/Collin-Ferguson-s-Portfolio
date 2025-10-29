// Function to load and inject the shared header
async function loadHeader() {
    try {
        const response = await fetch('src/html/header.html');
        const headerHtml = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = headerHtml;
        
        // Find the header placeholder
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.replaceWith(...temp.children);
            
            // Set active state for current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const links = document.querySelectorAll('.nav-menu a');
            
            links.forEach(link => {
                const href = link.getAttribute('href').split('#')[0];
                if (href === currentPage) {
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