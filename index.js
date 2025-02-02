/*Обработка Бургера*/
let burger = document.querySelector('.burger');
let navbar = document.querySelector('.navbar');

// Открытие/закрытие меню
burger.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active');
    burger.classList.toggle('active');
});

// Закрытие меню при клике вне области
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !burger.contains(e.target)) {
        navbar.classList.remove('active');
    }
});

// Закрытие меню при ресайзе окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
    }
});

// Рендеринг меню
function renderMenu(){
    for (const item of products){
        const galleryMenu = document.querySelector('.gallery');

        const cardItem = document.createElement('div');
        cardItem.innerHTML = `
            <div class="card" id=${item.id} category=${item.category}>
                <img src=${item.image} alt="">
                <div class="card-text">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <button class="add-to-cart">В корзину</button>
                </div>
            </div>
        `
        galleryMenu.appendChild(cardItem);
    }
}


/* Обновление товаров и корзины при загрузке страницы */
window.onload = () => {
    const savedState = JSON.parse(localStorage.getItem('checkboxState'));
    if (savedState) {
        checkbox.forEach(cb => {
            cb.checked = savedState[cb.value] || false;
        });
    }

    if (products.length > 0) {
        renderMenu();
        updateCartCounter();
    }

    handleFilterChange();
};