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
            
            // Initialize mobile menu functionality
            initializeMobileMenu();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const btn = document.getElementById("menuButton");
    const menu = document.getElementById("menu");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (!btn || !menu) {
        console.error('Mobile menu elements not found');
        return;
    }

    function closeMenu() {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
        menu.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
    }

    // Mobile menu toggle
    btn.addEventListener("click", () => {
        const isOpen = menu.classList.contains("open");
        isOpen ? closeMenu() : openMenu();
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            closeMenu();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
            btn.focus();
        }

        if (
            (e.key === "ArrowDown" || e.key === "Down") &&
            document.activeElement === btn
        ) {
            e.preventDefault();
            openMenu();
            const first = menu.querySelector("a");
            if (first) first.focus();
        }

        // Handle arrow keys for dropdown navigation (only on desktop)
        if (window.innerWidth > 768 && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            const dropdown = e.target.closest(".dropdown-menu");
            if (dropdown) {
                e.preventDefault();
                const items = [...dropdown.querySelectorAll("a")];
                const currentIndex = items.indexOf(document.activeElement);
                const direction = e.key === "ArrowDown" ? 1 : -1;
                const nextIndex =
                    (currentIndex + direction + items.length) % items.length;
                items[nextIndex].focus();
            }
        }
    });

    // Enhance dropdowns for touch devices (only on desktop/tablet)
    if ("ontouchstart" in window && window.innerWidth > 768) {
        dropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector(".dropdown-trigger");
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                const isOpen = dropdown.classList.contains("touch-open");

                // Close all other dropdowns
                dropdowns.forEach((d) => d.classList.remove("touch-open"));

                if (!isOpen) {
                    dropdown.classList.add("touch-open");
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".dropdown")) {
                dropdowns.forEach((d) => d.classList.remove("touch-open"));
            }
        });
    }

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                closeMenu();
            }
        });
    });
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
