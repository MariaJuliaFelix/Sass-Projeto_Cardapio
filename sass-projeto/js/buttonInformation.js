import { price } from "./services.js";

export function buttonInformations() {
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
                    <img class="img-information" src="${data.url_banner}" alt="${data.description}">
               
                    <h3>${price(data.price)}</h3>
            
                    <h4>Método de envio</h4>
                    <select id="envio">
                        <option>Escolha o método de envio</option>
                        <option id="delivey" value="delivery">Entrega</option>
                        <option id="establishment" value="establishment">Retirada</option>
                    </select>
                    
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
