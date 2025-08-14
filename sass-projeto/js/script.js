const imagens = ["img/banner/banner1.png", "img/banner/banner2.png", "img/banner/banner3.png"];
let index = 0;

const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagens.length;
  bannerImg.src = imagens[index];
}, 5000); 


import { renderMenu } from "./renderMenu.js";
import { buttonInformations } from "./buttonInformation.js";

async function getMenu() {
    try {
        const response = await fetch("https://d41d75f43ca7.ngrok-free.app/restaurant/menu", {
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
