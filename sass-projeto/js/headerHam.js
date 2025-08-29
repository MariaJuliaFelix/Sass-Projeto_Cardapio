const hamburgerIcon = document.querySelector('.headerHam');
const navMenu = document.querySelector('.nav-menu');

hamburgerIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');   
  hamburgerIcon.classList.toggle('open'); 
});
