
const cartItems = document.querySelector('.cart-items');

function noItemsInCart(){
    const mainCart = document.querySelector('.main-cart');
    mainCart.innerHTML = '';

    mainCart.innerHTML = `
    <section class="cart-noItem">
        <div class="container-noItemsCart">
            <img src="../empty-cart.svg" alt="cart">
            <p>В корзине ничего нет =(</p>                
        </div>
    </section>
    `;
}

let cartData = Object.entries(cart);

if (cartData <= 0 ){
    noItemsInCart()
}

// рендер корзины
function renderCart (){
    cartItems.innerHTML = '';
    let totalPrice = 0;


    for(const [itemID, data] of Object.entries(cart)){
        const product = {
            name: data.name,
            quantity: data.quantity,
            price: data.price,
        }

        console.log(product.name, product.price, product.quantity);
        totalPrice += product.price * product.quantity;

        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.dataset.itemId = itemID;
        item.innerHTML = `
        <h3 class="item-name">${product.name}</h3>
        <div class="quantity-control">
            <p>Количество: ${product.quantity}</p>
            <div class="buttonBox">
                <button class="decrease">-</button>
                <button class="increase">+</button>
            </div>
        </div>
        <p>Цена за шт.: ${formatPrice(product.price)} ₽</p>
        <p>Сумма: ${formatPrice(product.quantity * product.price)} ₽</p>
        <button class="deleteItem">Удалить</button>
    `
        cartItems.appendChild(item)
    }

    function formatPrice (price){
        return price.toLocaleString(`ru-RU`);
    }
    // Вывод общей суммы
    if (cartData <= 0){
        return
    } else {
        document.querySelector('.total-price').textContent = `Общая сумма: ${formatPrice(totalPrice)} ₽`;
    }

    // Увеличение кол-ва с обработкой нажатия
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e)=>{
            const cartItem = e.target.closest('.cart-item');
            const itemID = cartItem.dataset.itemId;

            if(cart[itemID] && cart[itemID].quantity > 0){
                cart[itemID].quantity = cart[itemID].quantity + 1;
            } else {
                cart[itemID].quantity = 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        })
    })

    // Уменьшение кол-ва с обработкой нажатия
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e)=>{
            const cartItem = e.target.closest('.cart-item');
            const itemID = cartItem.dataset.itemId;

            if(cart[itemID] && cart[itemID].quantity > 1){
                cart[itemID].quantity--;
            } else if(cart[itemID]) {
                delete cart[itemID];
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        })
    })

    //удаление из корзины
    document.querySelectorAll('.deleteItem').forEach(button => {
        button.addEventListener('click', (e)=>{
            const cartItem = e.target.closest('.cart-item');
            const itemID = cartItem.dataset.itemId;

            if(cart[itemID] &&  cart[itemID].quantity > 0){
                delete cart[itemID];
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        })
    })
}
// Обработка (перерисовка) при загрузке страницы
renderCart();