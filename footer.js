// Function to load and inject the shared footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHtml = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = footerHtml;
        
        // Find the footer placeholder
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.replaceWith(...temp.children);
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);
