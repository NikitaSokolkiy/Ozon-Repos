function renderCart (){
    const cartItems = document.querySelector('.cart-items');
    let totalPrice = 0;

    cartItems.innerHTML = '';

    for(const [quantity, product] of Object.entries(cart)) {
        const {quantity, name, price} = product;

        totalPrice += price * quantity;


        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${name}</h3>
            <p>Колличество: ${quantity}</p>
            <p>Ценна: ${price}</p>
            <p>Сумма: ${price * quantity}</p>
        `;
        cartItems.appendChild(cartItem);
    }

    document.querySelector('.total-price').textContent = `Общая сумма: ${totalPrice}`;
}

if(window.location.pathname.includes('cart.html')){
    renderCart();
}