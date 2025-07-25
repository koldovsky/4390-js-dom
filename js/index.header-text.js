const headerTitle = document.querySelector('h1');

const greetings = [
    'Вітаю!',
    'Привіт!',
    'Hello!',
    'Салют!',
    'Добрий день!'
];

const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
headerTitle.innerText = randomGreeting;