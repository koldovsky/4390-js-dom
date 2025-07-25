const products = [
    {
        id: 1,
        name: "Baby Yoda",
        price: 29.99,
        description: "A cute and adorable Baby Yoda figure.",
        imageUrl: "img/baby-yoda.svg"
    },
    {
        id: 2,
        name: "Banana",
        price: 49.99,
        description: "Bananas are a great source of potassium and fiber.",
        imageUrl: "img/banana.svg"
    },
    {
        id: 3,
        name: "Girl",
        price: 19.99,
        description: "Girl is a representation of strength and beauty.",
        imageUrl: "img/girl.svg"
    },
    {
        id: 4,
        name: "Viking",
        price: 19.99,
        description: "A fierce Viking warrior.",
        imageUrl: "img/viking.svg"
    }
];


function renderProducts(products) {
    const productsHtmlList = [];
    for (const product of products) {
        productsHtmlList.push(`
        <article class="products__item">
            <img class="products__image" src="${product.imageUrl}" alt="${product.name}">
            <h3 class="products__name">${product.name}</h3>
            <p class="products__description">${product.description}</p>
            <div class="products__actions">
                <button class="products__button products__button--info button button-card">
                    Info
                </button>
                <button class="products__button products__button--buy button button-card">
                    Buy - $${product.price.toFixed(2)}
                </button>
            </div>
        </article>
        `);
    }
    const productsContainer = document.querySelector(".products__list");
    productsContainer.innerHTML = productsHtmlList.join("");
}
        
renderProducts(products);