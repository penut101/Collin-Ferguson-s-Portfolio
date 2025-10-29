// Theme toggle functionality
(function() {
    // Create theme toggle button
    function createThemeToggle() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="theme-icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sun-icon" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="moon-icon" style="display: none;" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `;
        
        document.body.appendChild(button);
        return button;
    }

    // Toggle theme
    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        
        // Toggle icon
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        if (isDark) {
            sunIcon.style.display = '';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = '';
        }
    }

    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const button = createThemeToggle();
        button.addEventListener('click', toggleTheme);
        
        // Set initial icon
        const isDark = savedTheme === 'dark';
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = '';
        }
    }

    // Run initialization when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();