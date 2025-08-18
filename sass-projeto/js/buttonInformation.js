import { price } from "./services.js";

export function buttonInformations() {
  const buttons = document.querySelectorAll(".button-comprar");
  const modal = document.getElementById("meuModal");
  const span = modal.querySelector(".fechar");   
  const modalBody = modal.querySelector("#modal-body"); 


  buttons.forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      console.log("Clicou no botão com id:", id);

      try {
        const response = await fetch(`https://d41d75f43ca7.ngrok-free.app/restaurant/product/${id}`, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': true,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);

        modalBody.innerHTML = `
          <h2>${data.description}</h2>
          <img class="img-information" src="${data.url_banner}" alt="${data.description}">
          <h3>${price(data.price)}</h3>
         <div class="select-lista">
            <select id="envio">
                <option value="">Escolha o método de envio</option>
                <option value="delivery">Entrega</option>
                <option value="establishment">Retirada</option>
            </select>
            </div>
            <div class="forma_de_pagamento">
              <h2> Forma do pagamento</h2>
              <div class="cartao>
              <input id="credit_card_name"></input>
              <input id="credit_card_number"></input>
              <input id="credit_card_date_expiration"></input>
              <input id="credit_card_code"></input>
              </div> 
              
            <select class="select-lista">
              <option value="delivery">Entrega</option>
              <option value="establishment">Retirada</option>
              </select> 
            </div> 

        `;

        modal.style.display = "flex"; 

      } catch (erro) {
        console.error("Erro no fetch:", erro);
      }
    });
  });

        modal.style.display = "none"; 


  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {  
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
