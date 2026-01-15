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
                // Remove old inline onclick if present to be safe, though not strictly necessary if we attach new listeners
                item.removeAttribute('onclick');
                item.addEventListener('click', () => this.open(index));
            }
        });
    }

    injectOverlay() {
        // Check if overlay already exists
        let existingOverlay = document.getElementById('imageOverlay');
        if (existingOverlay) {
            this.overlay = existingOverlay;
            this.overlayImage = document.getElementById('overlayImage');
            return;
        }

        const overlayHTML = `
            <div class="overlay" id="imageOverlay">
                <button class="overlay-btn close-btn" aria-label="Close">×</button>
                <button class="overlay-btn nav-btn prev-btn" aria-label="Previous">‹</button>
                <div class="overlay-content">
                    <img src="" alt="Gallery View" class="overlay-img" id="overlayImage" />
                </div>
                <button class="overlay-btn nav-btn next-btn" aria-label="Next">›</button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', overlayHTML);
        this.overlay = document.getElementById('imageOverlay');
        this.overlayImage = document.getElementById('overlayImage');
    }

    attachListeners() {
        // Close button
        this.overlay.querySelector('.close-btn').addEventListener('click', () => this.close());

        // Navigation buttons
        this.overlay.querySelector('.prev-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.slide(-1);
        });
        this.overlay.querySelector('.next-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.slide(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.slide(-1);
            if (e.key === 'ArrowRight') this.slide(1);
        });

        // Click outside to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    slide(direction) {
        this.currentIndex += direction;

        if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        }

        this.updateImage();
    }

    updateImage() {
        this.overlayImage.src = this.images[this.currentIndex];
    }
}
