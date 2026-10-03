const overlay = document.querySelector('.image-overlay');
const overlayImg = document.querySelector('.overlay-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentArtworks = [];
let currentIndex = -1;

function updateOverlay(index) {
    if (index < 0 || index >= currentArtworks.length) return;

    currentIndex = index;
    overlayImg.src = currentArtworks[currentIndex];
    overlay.classList.add('active');
}

function closeOverlay() {
    overlay.classList.remove('active');
    setTimeout(() => {
        overlayImg.src = '';
        currentArtworks = [];
        currentIndex = -1;
    }, 300);
}

window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'ARTWORK_CLICK') {
        currentArtworks = e.data.sources || [];
        currentIndex = e.data.index;
        updateOverlay(currentIndex);
    }
});

closeBtn.addEventListener('click', closeOverlay);

prevBtn.addEventListener('click', () => {
    if (currentArtworks.length === 0) return;
    const newIndex = (currentIndex - 1 + currentArtworks.length) % currentArtworks.length;
    updateOverlay(newIndex);
});

nextBtn.addEventListener('click', () => {
    if (currentArtworks.length === 0) return;
    const newIndex = (currentIndex + 1) % currentArtworks.length;
    updateOverlay(newIndex);
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
});

window.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeOverlay();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});