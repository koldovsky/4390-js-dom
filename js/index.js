function init() {
    import('./index.header-text.js');
    import('./index.header-clock.js');
    import('./index.product-list.js');
    import('./index.product-carousel.js');
}

const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});