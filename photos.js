// photos.js - Adds interactivity to the photo collage

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.photo-collage img');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            openModal(img.src, img.alt);
        });
    });

    // Modal creation
    function openModal(src, alt) {
        let modal = document.getElementById('photo-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'photo-modal';
            modal.style.position = 'fixed';
            modal.style.top = 0;
            modal.style.left = 0;
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.85)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = 10000;
            modal.innerHTML = `
                <img src="${src}" alt="${alt}" style="max-width:90vw; max-height:80vh; border-radius:1rem; box-shadow:0 8px 32px rgba(0,0,0,0.4);">
                <button id="close-modal" style="position:absolute;top:2rem;right:2rem;font-size:2rem;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
            `;
            document.body.appendChild(modal);
            modal.addEventListener('click', function (e) {
                if (e.target === modal || e.target.id === 'close-modal') {
                    modal.remove();
                }
            });
        }
    }
});
