class Carousel {
    constructor(selector) {
        this.selector = selector;
        this.images = [];
        this.currentIndex = 0;
        this.overlay = null;
        this.overlayImage = null;

        this.init();
    }

    init() {
        this.collectImages();

        if (this.images.length === 0) return;

        this.injectOverlay();
        this.attachListeners();
    }

    collectImages() {
        const items = document.querySelectorAll(this.selector);
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                this.images.push(img.src);
                // Remove potential onclick handlers
                item.removeAttribute('onclick');
                item.addEventListener('click', () => this.open(index));
            }
        });
    }

    injectOverlay() {
        let existingOverlay = document.getElementById('imageOverlay');
        if (existingOverlay) {
            this.overlay = existingOverlay;
            this.overlayImage = document.getElementById('overlayImage');
            return;
        }

        // Using Tailwind classes for styling (fixed, full screen, centered, black backdrop with blur)
        // Transition classes are included for the fade effect
        const overlayHTML = `
            <div id="imageOverlay" class="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300">
                <button class="close-btn absolute top-4 right-4 p-4 text-zinc-400 hover:text-white transition-colors z-50 rounded-full hover:bg-white/10" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                
                <button class="prev-btn absolute left-4 top-1/2 -translate-y-1/2 p-4 text-zinc-400 hover:text-white transition-colors z-50 hidden sm:block rounded-full hover:bg-white/10" aria-label="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>

                <div class="overlay-content relative max-w-7xl w-full h-full p-4 flex items-center justify-center outline-none">
                    <img src="" alt="Gallery View" id="overlayImage" class="max-w-full max-h-[90vh] w-auto h-auto object-contain shadow-2xl rounded-sm select-none" />
                </div>

                <button class="next-btn absolute right-4 top-1/2 -translate-y-1/2 p-4 text-zinc-400 hover:text-white transition-colors z-50 hidden sm:block rounded-full hover:bg-white/10" aria-label="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHTML);
        this.overlay = document.getElementById('imageOverlay');
        this.overlayImage = document.getElementById('overlayImage');
    }

    attachListeners() {
        this.overlay.querySelector('.close-btn').addEventListener('click', () => this.close());

        this.overlay.querySelector('.prev-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.slide(-1);
        });
        this.overlay.querySelector('.next-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.slide(1);
        });

        document.addEventListener('keydown', (e) => {
            // Check if overlay is visible using class
            if (this.overlay.classList.contains('pointer-events-none')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.slide(-1);
            if (e.key === 'ArrowRight') this.slide(1);
        });

        this.overlay.addEventListener('click', (e) => {
            // Close if clicking the background (not the image or buttons)
            if (e.target === this.overlay || e.target.closest('.overlay-content') === e.target) {
                this.close();
            }
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();

        // Show overlay with transition
        this.overlay.classList.remove('opacity-0', 'pointer-events-none');
        this.overlay.classList.add('opacity-100', 'pointer-events-auto');

        document.body.style.overflow = 'hidden';
    }

    close() {
        // Hide overlay
        this.overlay.classList.remove('opacity-100', 'pointer-events-auto');
        this.overlay.classList.add('opacity-0', 'pointer-events-none');

        document.body.style.overflow = '';
    }

    slide(direction) {
        this.currentIndex += direction;

        if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        }

        // Optional: Simple fade for image switch could be added here, but keeping it snappy for now
        this.updateImage();
    }

    updateImage() {
        this.overlayImage.src = this.images[this.currentIndex];
    }
}
