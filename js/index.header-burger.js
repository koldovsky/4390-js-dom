const burgerButton = document.getElementById('burger-menu');
const headerMenu = document.getElementById('header-menu');

if (burgerButton && headerMenu) {
    burgerButton.addEventListener('click', function () {
        // Toggle active class on burger button for animation
        burgerButton.classList.toggle('active');

        // Toggle active class on menu for visibility
        headerMenu.classList.toggle('active');
    });

    // Close menu when clicking on menu items (for mobile)
    const menuItems = headerMenu.querySelectorAll('.menu__item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth < 600) {
                burgerButton.classList.remove('active');
                headerMenu.classList.remove('active');
            }
        });
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 600) {
            burgerButton.classList.remove('active');
            headerMenu.classList.remove('active');
        }
    });
}
