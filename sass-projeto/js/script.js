const imagens = ["img/banner/banner1.png", "img/banner/banner2.png", "img/banner/banner3.png"];
let index = 0;

const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagens.length;
  bannerImg.src = imagens[index];
}, 5000); 


// irei apenas usar GET, POST e PATCH


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
    } catch (err) {
        console.error(err);
    }
}

function renderMenu(items) {
    const containerMenu = document.querySelector("#container_menu");

    containerMenu.innerHTML = items.map(item => `
        <div class="card-menu">
            <img src="${item.url_banner}" alt="${item.description}">
            <p>${item.description}</p>
        </div>
    `).join("");
}

getMenu();
