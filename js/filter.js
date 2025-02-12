let activeFilters = {
    categories: [],
    priceMin: null,
    priceMax: null,
    searchQuery: "",
    sortType: 'default'
}

function applyAllFilters(products) {
    //Фильтрация
    return products.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(activeFilters.searchQuery.toLowerCase());
        const categoryMatch = activeFilters.categories.length === 0
            || activeFilters.categories.includes(item.category);
        const priceMatch = (!activeFilters.priceMin || item.price >= activeFilters.priceMin)
            && (!activeFilters.priceMax || item.price <= activeFilters.priceMax);
    return searchMatch && categoryMatch && priceMatch;
    //Сортировка
    }).sort((a, b) => {
        switch (activeFilters.sortType) {
            case "price_asc": return a.price - b.price;
            case "price_desc" : return b.price - a.price;
            case "name_asc": return a.name.localeCompare(b.name);
            case "name_desc": return b.name.localeCompare(a.name);
            default: return 0;
        }
    });
}

function initFilters(products) {
    //обработка категорий
    document.querySelectorAll('input[name="category"]').forEach(item => {
        item.addEventListener('change', e => {
            if(e.target.checked) {
                activeFilters.categories.push(e.target.value);
            } else {
                activeFilters.categories = activeFilters.categories.filter(c => c !== e.target.value);
            }
            renderMenu(applyAllFilters(products));
        })
    })

    //Обработка цены
    const priceInput = document.querySelectorAll('input[name="priceMin"], input[name="priceMax"]');
    priceInput.forEach(price => {
        price.addEventListener('input', () => {
            activeFilters.priceMin = document.querySelector('input[name="priceMin"]').value ?
                parseInt(document.querySelector('input[name="priceMin"]').value) : null;

            activeFilters.priceMax = document.querySelector('input[name="priceMax"]').value ?
                parseInt(document.querySelector('input[name="priceMax"]').value) : null;

            renderMenu(applyAllFilters(products));
        })
    })

    //Обработка типа сортировки
    document.getElementById('sort').addEventListener('change', e => {
        activeFilters.sortType = e.target.value;
        renderMenu(applyAllFilters(products));
    })

    //Обработчик поиска
    document.querySelector('.searchInput').addEventListener('input', e => {
        setTimeout(()=>{
            activeFilters.searchQuery = e.target.value.trim();
            renderMenu(applyAllFilters(products));
        }, 500)
    })
}

initFilters(products);