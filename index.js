
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

/*Добавление в корзину и localStorage*/
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Добавление товара
function addToCart(productID, name, price) {
    if(cart[productID]){
        cart[productID].quantity += 1;
    } else {
        cart[productID] = {quantity: 1,
            name: name,
            price: price
        };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

console.log(cart)
// Обновление счетчика
function updateCartCounter(){
    const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.cart-button').textContent = `Корзина (${totalItems})`;
}

// Обработка кнопки (В корзину)
document.querySelectorAll('.add-to-cart').forEach((item) => {
    item.addEventListener('click', (e)=>{
        const card = e.target.closest('.card');
        const productID = card.id
        const name = card.querySelector('h3').textContent
        const itemPrice = parseFloat(card.querySelector('p').textContent.replace(/[^0-9.,]/g, '').replace(',', '.'));
        addToCart(productID, name, itemPrice);
    });
})


window.onload = ()=>{
    if(Object.keys(cart).length > 0){
        updateCartCounter();
    } else {
        document.querySelector('.cart-button').textContent = 'Корзина'
    }
}