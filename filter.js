//1
/*Получение информации об фильтрах*/
const checkbox = document.querySelectorAll('input[type="checkbox"]');

// Применение фильтров
function categoryFilter(products) {
    const selectedCategory = Array.from(checkbox)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const formPriceInput = document.querySelector('.fromPrice input');
    const toPriceInput = document.querySelector('.toPrice input');
    const minPrice = parseFloat(formPriceInput.value) || 0;
    const maxPrice = parseFloat(toPriceInput.value) || Infinity;

    return products.filter(product => {
        const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(product.category);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });
}

function updateGallery(filteredProducts) {
    const gallery = document.querySelector('.gallery');
    if(!gallery) return;

    gallery.innerHTML = '';
    filteredProducts.forEach(product => {
        const cardItem = document.createElement('div');
        cardItem.innerHTML = `
            <div class="card" id=${product.id} category=${product.category}>
                <img src=${product.image} alt="">
                <div class="card-text">
                    <h3>${product.name}</h3>
                    <p>Цена: ${product.price} ₽</p>
                    <button class="add-to-cart">В корзину</button>
                </div>
            </div>
        `;
        gallery.appendChild(cardItem);
    });
}

function handleFilterChange(){
    const filteredProducts = categoryFilter(products);
    updateGallery(filteredProducts);
}

checkbox.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        const checkboxState = {};
        checkbox.forEach((cb)=>{
            checkboxState[cb.value] = cb.checked;
        });
        localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
        handleFilterChange();
    });
})

const priceInput = document.querySelectorAll('.rangePrice-container input');
priceInput.forEach(price => {
    price.addEventListener('change', handleFilterChange);
})

