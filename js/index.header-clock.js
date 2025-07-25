const clockContainer = document.querySelector('.header__clock-container');

function updateClock() {
    const now = new Date();
    clockContainer.innerText = now.toLocaleTimeString('uk-UA');
}

setInterval(updateClock, 1000);