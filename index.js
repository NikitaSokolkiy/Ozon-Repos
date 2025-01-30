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