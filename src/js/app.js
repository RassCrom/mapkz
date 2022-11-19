const header = document.getElementById('header')
let lastScroll;
let currentScroll;

window.document.addEventListener('scroll', () => {
    lastScroll = currentScroll
    currentScroll  =  window.scrollY
    if (lastScroll < currentScroll) {
        header.classList.add('header-up')
    } else {
        header.classList.remove('header-up')
    }

    if (currentScroll <= 650) {
        header.style.background = 'rgba(0, 0, 1, 0)';
    } else {
        header.style.background = 'rgba(0, 0, 1, 0.5)';
    }
    
})


const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,

    effect: 'cube',
    cubeEffect: {
        slideShadows: false,
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });