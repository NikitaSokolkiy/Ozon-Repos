/*Добавление в корзину и localStorage*/
let cart = JSON.parse(localStorage.getItem('cart')) || {};



// Функция добавления товара в корзину
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

// Обновление счетчика корзины
function updateCartCounter(){
    const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.cart-button').textContent = `Корзина (${totalItems})`;
}

// Обработка кнопки (В корзину)
document.querySelector('.gallery').addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.card');
        const productID = card.id
        const name = card.querySelector('h3').textContent
        const itemPrice = parseFloat(card.querySelector('p').textContent.replace(/[^0-9.,]/g, '').replace(',', '.'));
        addToCart(productID, name, itemPrice);
    }
});