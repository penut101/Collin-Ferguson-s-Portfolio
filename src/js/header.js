// Function to load and inject the shared header
async function loadHeader() {
    try {
        // Determine whether current page lives in src/html/ (pages like src/html/about.html)
    const inSrcHtml = window.location.pathname.includes('/src/html/') || window.location.pathname.includes('\\src\\html\\');
        // Use a fetch path that works from both root and src/html pages
        const fetchPath = inSrcHtml ? 'header.html' : 'src/html/header.html';
        const response = await fetch(fetchPath);
        const headerHtml = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = headerHtml;
        
        // Find the header placeholder
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.replaceWith(...temp.children);
            
            // Normalize nav hrefs so the same header HTML works from root and from src/html/
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const links = document.querySelectorAll('.nav-menu a');

            links.forEach(link => {
                const orig = link.getAttribute('href') || '';
                // Skip external or mailto or pure-fragment links
                if (/^(https?:|mailto:|#)/i.test(orig)) return;

                // Split base and fragment (keep any fragments intact)
                const hashIndex = orig.indexOf('#');
                const base = hashIndex === -1 ? orig : orig.substring(0, hashIndex);
                const frag = hashIndex === -1 ? '' : orig.substring(hashIndex);

                let newHref = orig;

                if (inSrcHtml) {
                    // When on a page inside src/html/, header.html is in same folder.
                    // Links pointing to index should go up one level.
                    if (base === 'index.html' || base === 'index') {
                        newHref = '../index.html' + frag;
                    } else if (base.startsWith('src/html/')) {
                        // If header used a root-relative src path, collapse to local filename
                        newHref = base.split('/').pop() + frag;
                    } else {
                        // keep local filenames (about.html, work.html, etc.) as-is
                        newHref = base + frag;
                    }
                } else {
                    // When on a root page (index.html), other pages live in src/html/
                    if (base === 'index.html' || base === 'index') {
                        newHref = 'index.html' + frag;
                    } else if (base.startsWith('src/html/')) {
                        newHref = base + frag; // already correct
                    } else {
                        // point to src/html/<page>
                        newHref = 'src/html/' + base + frag;
                    }
                }

                link.setAttribute('href', newHref);
            });

            // After normalization, set active state for current page by comparing basenames
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