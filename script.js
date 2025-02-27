document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    '.animate-show, .animate-right, .animate-left, .animate-bottom, .animate-top'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  ); // Aciona quando 20% do elemento está visível

  elements.forEach((el) => observer.observe(el));
});

// Controle do menu hamburguer
let scrollPosition = 0;
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
  this.classList.toggle('active');
  navMenu.classList.toggle('active');

  if (document.body.classList.contains('no-scroll')) {
    document.body.style.top = '';
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPosition);
  } else {
    scrollPosition = window.scrollY;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
  }
});

// Fechar menu ao clicar nos links
document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (link.hash === '#home') e.preventDefault();
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.top = '';
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPosition);
  });
});

// Fechar ao clicar fora do menu
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
    if (navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.top = '';
      document.body.classList.remove('no-scroll');
      window.scrollTo(0, scrollPosition);
    }
  }
});

// Controle de stylesheets otimizado
const styleLink = document.querySelector('link[rel="stylesheet"]');
let currentBreakpoint = window.innerWidth < 800 ? 'mobile' : 'desktop';
let resizeTimeout;

function switchStylesheet() {
  const newBreakpoint = window.innerWidth < 800 ? 'mobile' : 'desktop';

  if (newBreakpoint !== currentBreakpoint) {
    currentBreakpoint = newBreakpoint;
    styleLink.href = `./sass/${currentBreakpoint === 'mobile' ? 'mobileStyle' : 'style'}.css`;
  }
}

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(switchStylesheet, 100);
});

window.addEventListener('load', switchStylesheet);
