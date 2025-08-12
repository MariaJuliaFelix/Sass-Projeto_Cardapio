const imagens = ["img/banner/banner1.png", "img/banner/banner2.png", "img/banner/banner3.png"];
let index = 0;

const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagens.length;
  bannerImg.src = imagens[index];
}, 5000); 


// irei apenas usar GET, POST e PATCH



fetch("https://d41d75f43ca7.ngrok-free.app/restaurant/menu", {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': true, //acesso no servidor local
        'Content-Type': 'application/json' //tipo de dado que vou receber
        }
      
})
.then(response => response)
.then(response => resolve(response.json())) //extrai o json
.catch(err => console.log(err)); // erros serao mostrados no console, fins de debug
