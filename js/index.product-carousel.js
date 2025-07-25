const slides = [
    '<div><img src="img/baby-yoda.svg" alt="Baby Yoda"></div>',
    '<div><img src="img/banana.svg" alt="Banana"></div>',
    '<div><img src="img/girl.svg" alt="Girl"></div>',
    '<div><img src="img/viking.svg" alt="Viking"></div>'
];

const carousel = document.querySelector('.product-carousel__slide-container');
let currentIndex = 0;

function showSlides() {
    carousel.innerHTML = slides[currentIndex];
    if ( window.matchMedia('(min-width: 640px)').matches ) {
        const secondSlideIndex = (currentIndex + 1) % slides.length;
        carousel.innerHTML += slides[secondSlideIndex];
        if ( window.matchMedia('(min-width: 1024px)').matches ) {
            const thirdSlideIndex = (currentIndex + 2) % slides.length;
            carousel.innerHTML += slides[thirdSlideIndex];
        }
    }
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlides();
}
// setInterval(nextSlide, 3000); // Change slide every 3 seconds
showSlides(); // Initial call to display the first slide

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlides();
}

const nextBtn = document.querySelector('.product-carousel__btn-next');
nextBtn.addEventListener('click', nextSlide);

const prevBtn = document.querySelector('.product-carousel__btn-prev');
prevBtn.addEventListener('click', prevSlide);

window.addEventListener('resize', showSlides);

