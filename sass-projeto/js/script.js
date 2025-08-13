const imagens = ["img/banner/banner1.png", "img/banner/banner2.png", "img/banner/banner3.png"];
let index = 0;

const bannerImg = document.getElementById("banner-img");

setInterval(() => {
  index = (index + 1) % imagens.length;
  bannerImg.src = imagens[index];
}, 5000); 


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

function renderMenu(items) {
    const containerMenu = document.querySelector("#container_menu");
    containerMenu.innerHTML = items.map(item =>
        `<div class="card-menu">
            <img src="${item.url_banner}" alt="${item.description}">
            <p class="descricao">${item.description}</p>
            <p class="valor">R$ ${item.price}</p>
            <button class="button-comprar" data-id="${item.id}">Comprar</button>
        </div>`
    ).join("");
}

function buttonInformations() {
    const buttons = document.querySelectorAll(".button-comprar");
    const modal = document.getElementById("meuModal");
    const btnFechar = modal.querySelector(".fechar");
    const modalContent = modal.querySelector(".modal-content"); 

    buttons.forEach(button => {
        button.addEventListener("click", async function () {
            const id = this.dataset.id;

            try {
                const response = await fetch(`https://d41d75f43ca7.ngrok-free.app/restaurant/product/${id}`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': true,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                modalContent.innerHTML = `
                    <h2>${data.description}</h2>
                    <img src="${data.url_banner}" alt="${data.description}">
               
                    <p>R$ ${data.price}</p>

                `;

                modal.style.display = "block";

            } catch (erro) {
                console.error(erro);
            }
        });
    });

    btnFechar.onclick = () => modal.style.display = "none";

    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none";
    };
}

getMenu();
