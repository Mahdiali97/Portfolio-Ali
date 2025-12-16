// script.js

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to Top Button
const scrollTopButton = document.getElementById('scroll-top');

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopButton.style.display = "flex";
    } else {
        scrollTopButton.style.display = "none";
    }
});

scrollTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// AOS Initialization
AOS.init({
    duration: 1000, // Animation duration
    once: true // Whether animation should happen only once - while scrolling down
});

// Swiper Initialization for Testimonials
const swiper = new Swiper('.init-swiper', {
    loop: true,
    speed: 600,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 1,
        },
    },
});

