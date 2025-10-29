// References page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to reference cards when they come into view
    const cards = document.querySelectorAll('.reference-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial styles and observe cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Add hover effect to contact info
    const contactInfos = document.querySelectorAll('.contact-info');
    contactInfos.forEach(info => {
        info.addEventListener('mouseenter', () => {
            info.style.transform = 'scale(1.02)';
        });
        info.addEventListener('mouseleave', () => {
            info.style.transform = 'scale(1)';
        });
    });
});