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
                    <img src="${data.url_banner}" alt="${data.description}">
               
                    <p>${price(data.price)}</p>
            
                    <h4>Metodo de envio</h4>
                    <select id="envio">
                        <option>Escolha o metodo de envio</option>
                        <option value="delivery">Entrega</option>
                        <option value="establishment">Retirada</option>
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
