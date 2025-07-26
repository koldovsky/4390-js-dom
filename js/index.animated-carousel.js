class AnimatedCarousel {
    constructor(selector) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;

        this.track = this.carousel.querySelector('.animated-carousel__track');
        this.prevBtn = this.carousel.querySelector('.animated-carousel__btn-prev');
        this.nextBtn = this.carousel.querySelector('.animated-carousel__btn-next');
        this.indicatorsContainer = this.carousel.querySelector('.animated-carousel__indicators');
        
        this.slides = [
            { src: 'img/baby-yoda.svg', alt: 'Baby Yoda', title: 'Baby Yoda Figurine' },
            { src: 'img/banana.svg', alt: 'Banana', title: 'Fresh Banana' },
            { src: 'img/girl.svg', alt: 'Girl', title: 'Girl Character' },
            { src: 'img/viking.svg', alt: 'Viking', title: 'Viking Warrior' },
        ];
        
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        this.createSlides();
        this.createIndicators();
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }

    getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 640) return 2;
        return 1;
    }

    createSlides() {
        this.track.innerHTML = '';
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'animated-carousel__slide';
            slideElement.innerHTML = `
                <div class="slide-content">
                    <img src="${slide.src}" alt="${slide.alt}" loading="lazy">
                    <h3 class="slide-title">${slide.title}</h3>
                </div>
            `;
            this.track.appendChild(slideElement);
        });
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        const totalPages = Math.ceil(this.slides.length / this.slidesPerView);
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'animated-carousel__indicator';
            indicator.setAttribute('aria-label', `Go to slide group ${i + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(i * this.slidesPerView));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    updateCarousel() {
        if (this.isAnimating) return;

        const slideWidth = 100 / this.slidesPerView;
        const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        
        // Ensure currentIndex is within bounds
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));
        
        const translateX = -(this.currentIndex * slideWidth);
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateIndicators();
        this.updateButtonStates();
    }

    updateIndicators() {
        const indicators = this.indicatorsContainer.querySelectorAll('.animated-carousel__indicator');
        const currentPage = Math.floor(this.currentIndex / this.slidesPerView);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentPage);
        });
    }

    updateButtonStates() {
        const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= maxIndex;
        
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
    }

    nextSlide() {
        if (this.isAnimating) return;
        
        const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        
        this.animateTransition(() => this.updateCarousel());
    }

    prevSlide() {
        if (this.isAnimating) return;
        
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            // Loop to end
            this.currentIndex = Math.max(0, this.slides.length - this.slidesPerView);
        }
        
        this.animateTransition(() => this.updateCarousel());
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        
        const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        this.animateTransition(() => this.updateCarousel());
    }

    animateTransition(callback) {
        this.isAnimating = true;
        
        // Add slide-in animation to new slides
        const visibleSlides = this.track.querySelectorAll('.animated-carousel__slide');
        visibleSlides.forEach((slide, index) => {
            if (index >= this.currentIndex && index < this.currentIndex + this.slidesPerView) {
                slide.classList.add('slide-in');
                setTimeout(() => slide.classList.remove('slide-in'), 500);
            }
        });
        
        callback();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    handleResize() {
        const newSlidesPerView = this.getSlidesPerView();
        if (newSlidesPerView !== this.slidesPerView) {
            this.slidesPerView = newSlidesPerView;
            this.createIndicators();
            this.updateCarousel();
        }
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });

        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        window.addEventListener('resize', () => this.handleResize());

        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support for mobile
        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoPlay();
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            this.startAutoPlay();
        }, { passive: true });

        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
            }
        });

        // Make carousel focusable for keyboard navigation
        this.carousel.setAttribute('tabindex', '0');
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    destroy() {
        this.stopAutoPlay();
        window.removeEventListener('resize', this.handleResize);
        // Remove other event listeners as needed
    }
}

// Initialize the animated carousel when DOM is loaded
const animatedCarousel = new AnimatedCarousel('.animated-carousel');

// Expose globally for debugging
window.animatedCarousel = animatedCarousel;
