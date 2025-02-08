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
function renderMenu(filteredProducts){
    const galleryMenu = document.querySelector('.gallery');
    galleryMenu.innerHTML = ''; // Очищаем галерею перед рендерингом

    for (const item of filteredProducts) {
        // Создаем элемент .card напрямую
        const cardItem = document.createElement('div');
        cardItem.classList.add('card'); // Добавляем класс "card"
        cardItem.setAttribute('id', item.id); // Устанавливаем id
        cardItem.setAttribute('category', item.category); // Устанавливаем атрибут category

        // Заполняем содержимое карточки
        cardItem.innerHTML = `
            <img src=${item.image} alt="${item.name}">
            <div class="card-text">
                <h3>${item.name}</h3>
                <p>Цена: ${item.price} ₽</p>
                <button class="add-to-cart">В корзину</button>
            </div>
        `;

        // Добавляем карточку в галерею
        galleryMenu.appendChild(cardItem);
    }
}


/* Обновление товаров и корзины при загрузке страницы */
window.onload = () => {
    if (products.length > 0) {
        renderMenu(products);
        updateCartCounter();
    }
};