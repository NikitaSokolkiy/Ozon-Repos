/*Получение информации об фильтрах*/
function filteredProducts(products){
    let activeCheckboxes = [];
    let activePrice = { min: null, max: null };

    function checkboxes(){
        const checkboxes = document.querySelectorAll('input[name="category"]');
        checkboxes.forEach(checkbox=>{
            checkbox.addEventListener('change', (e)=>{
                if(activeCheckboxes.includes(e.target.value)){
                    activeCheckboxes.splice(activeCheckboxes.indexOf(e.target.value), 1);
                } else {
                    activeCheckboxes.push(e.target.value);
                }
                console.log(activeCheckboxes);
                filter()
            })
        })
    }

    function minMaxPrice(){
        const minPrice = document.querySelector('input[name="priceMin"]');
        const maxPrice = document.querySelector('input[name="priceMax"]');

        minPrice.addEventListener('input', updatePriceRange);
        maxPrice.addEventListener('input',updatePriceRange);

        function updatePriceRange(){
            activePrice.min = minPrice.value ? parseInt(minPrice.value) : null;
            activePrice.max = maxPrice.value ? parseInt(maxPrice.value) : null;
            console.log(`Диапазон цен: ${activePrice.min} - ${activePrice.max}`);
            filter()
        }
    }
    function filter(){
        const filtered = products.filter(item => {
            return ((activeCheckboxes.length === 0 || activeCheckboxes.some(category => item.category.includes(category)))&&
                (activePrice.min === null || item.price >= activePrice.min)&&
                (activePrice.max === null || item.price <= activePrice.max)
            );
        });
        console.log(`Отфильтрованные продукты:`, filtered.map(item => {
            console.log(`Название: ${item.name}, Категории: ${item.category}, Цена: ${item.price}`);
        }));
        renderMenu(filtered)

    }


    //Инициализация
    checkboxes();
    minMaxPrice();

}
filteredProducts(products);