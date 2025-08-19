import { price } from "./services.js";
import { showLoading, hideLoading } from "./loading.js";
export function buttonInformations() {
  const buttons = document.querySelectorAll(".button-comprar");
  const modal = document.getElementById("meuModal");
  const span = modal.querySelector(".fechar");   
  const modalBody = modal.querySelector("#modal-body"); 

  
  buttons.forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      console.log("Clicou no botão com id:", id);
      showLoading();
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

          <div class="forma_de_pagamento">
            <h2>Forma de pagamento</h2>
            
          <div class="cartao">
          <input id="credit_card_name" placeholder="Nome no cartão" type="text">
          <input id="credit_card_number" placeholder="Número do cartão" type="text">
          <input id="credit_card_date_expiration" placeholder="Validade (MM/AA)" type="text">
          <input id="credit_card_code" placeholder="CVV" type="password">
        </div>

            <div class="select-lista">
              <select id="payment_method">
                <option value="">Escolha o método de envio</option>
                <option value="delivery">Entrega do pedido</option>
                <option value="establishment">Retirada do pedido</option>
              </select>
            </div>
          </div>

          <button id="confirmar-pedido" class="button-finalizar">Confirmar Pedido</button>
`;

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      } catch (erro) {
        console.error("Erro no fetch:", erro);
      } finally {
      hideLoading(); 
    }
    });
  });

 span.onclick = () => {
  modal.style.display = "none";
  document.body.style.overflow = ""; 
};

window.onclick = (event) => {  
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; 
  }
};
}
