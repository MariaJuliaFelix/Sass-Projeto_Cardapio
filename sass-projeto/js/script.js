const imagens = ["img/banner/banner1.png", "img/banner/banner2.png", "img/banner/banner3.png"];
let index = 0;

const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagens.length;
  bannerImg.src = imagens[index];
}, 5000); 


let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});



let trilho = document.getElementById('trilho')
let body = document.querySelector('body')

trilho.addEventListener('click', ()=>{
    trilho.classList.toggle('dark')
    body.classList.toggle('dark')
} )
