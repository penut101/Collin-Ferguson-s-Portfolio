// Function to load and inject the shared header
async function loadHeader() {
    try {
        // Normalize path separators and detect where this page lives:
        // - inSrcHtml: pages under /src/html/
        // - inSrcRoot: pages directly under /src/ (e.g. /src/index.html)
        const pathname = window.location.pathname.replace(/\\\\/g, '/');
        const inSrcHtml = pathname.includes('/src/html/');
        const inSrcRoot = pathname.includes('/src/') && !inSrcHtml;

        // Choose fetch path for the shared header depending on page location
        let fetchPath;
        if (inSrcHtml) fetchPath = 'header.html';
        else if (inSrcRoot) fetchPath = 'html/header.html';
        else fetchPath = 'src/html/header.html';
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
                    // Page lives in src/html/ — header is alongside it
                    if (base === 'index.html' || base === 'index') {
                        // Link back to src/index.html
                        newHref = '../index.html' + frag;
                    } else if (base.startsWith('src/html/')) {
                        // collapse any hard-coded src/html/ prefix to local filename
                        newHref = base.split('/').pop() + frag;
                    } else {
                        // local filenames (about.html, work.html) are in same folder
                        newHref = base + frag;
                    }
                } else if (inSrcRoot) {
                    // Page lives directly under /src/ (e.g., /src/index.html)
                    if (base === 'index.html' || base === 'index') {
                        // should point to /src/index.html
                        newHref = 'index.html' + frag;
                    } else if (base.startsWith('src/html/')) {
                        // collapse to src/html/<page> relative to /src/
                        newHref = base.replace(/^src\/html\//, 'html/') + frag;
                    } else {
                        // other pages live under /src/html/<page>
                        newHref = 'html/' + base + frag;
                    }
                } else {
                    // Page is at project root — header should point into src/html/
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