import { price } from "./services.js";
import { showLoading, hideLoading } from "./loading.js";
import { metodoSend } from "./metodoSend.js";
import { URL_BASE_API } from "./domain.js";
import { formPay } from "./pay.js";
export function buttonInformations() {
  const buttons = document.querySelectorAll(".button-comprar");
  const modal = document.getElementById("meuModal");
  const span = modal.querySelector(".fechar");   
  const modalBody = modal.querySelector("#modal-body"); 
  const header = document.querySelector("header");

  modal.style.display = "none";
 

  buttons.forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      header.classList.add("hide");
      console.log("Clicou no botão com id:", id);
      showLoading();
      try {
        const response = await fetch(`${URL_BASE_API}/restaurant/product/${id}`, {
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

          <form class="forma_de_pagamento" id="form-pay">

          <h2>Forma de pagamento</h2>
            
          <div class="cartao" >
          <input id="credit_card_name" placeholder="Nome no cartão" type="text">
          <input id="credit_card_number" placeholder="Número do cartão" type="text">
          <input id="credit_card_date" placeholder="Validade (MM/AA)" type="text">
          <input id="credit_card_code" placeholder="CVV" type="password">
        </div>

            <div class="select-lista">
              <select id="send_method">
                <option value="">Escolha o método de envio</option>
                <option id="delivery" value="delivery">Entrega do pedido</option>
                <option id="establishment" value="establishment">Retirada do pedido</option>
              </select>
            </div>
          

          <button type="submit" id="confirmar-pedido" class="button-finalizar">Confirmar Pedido</button>
          </form>
`;

        metodoSend(id);
        formPay(id);
    
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
        

      } catch (erro) {
        console.error("Erro no fetch:", erro);
      } finally {
      hideLoading(); 
    }
    });
  });

header.classList.remove("hide");

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
