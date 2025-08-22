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

const modal = document.getElementById("meuModal");
modal.style.display = "none";
import { renderMenu } from "./renderMenu.js";
import { buttonInformations } from "./buttonInformation.js";
import { URL_BASE_API } from "./domain.js";

async function getMenu() {
    try {
        const response = await fetch(`${URL_BASE_API}/restaurant/menu`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        renderMenu(data);
        buttonInformations(); 
    } catch (erro) {
        console.error(erro);
    }
}


getMenu();
