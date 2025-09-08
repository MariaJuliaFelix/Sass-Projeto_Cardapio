import { price, validarTypeDeliveryModal, informationStatus } from "./services.js";
import { showLoading, hideLoading } from "./loading.js";
import { getOptionsDelivery } from "./optionsSelectDelivery.js";
import { URL_BASE_API } from "./domain.js";
import { confirmValuesCreditCard } from "./pay.js";
import { confirmarPedido } from "./confirmar.js";

export function buttonInformations() {
  const buttons = document.querySelectorAll(".button-comprar");
  const modal = document.getElementById("meuModal");
  const span = modal.querySelector(".fechar");
  const modalBody = modal.querySelector("#modal-body");
  const header = document.querySelector("header");

  buttons.forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      try {
        const response = await fetch(`${URL_BASE_API}/restaurant/product/${id}`, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error("Erro na requisição: " + response.status);
        const data = await response.json();

        showLoading();
        header.classList.add("hide");

        // Monta o conteúdo do modal
        modalBody.innerHTML = `
          <h2>${data.description}</h2>
          <img class="img-information" src="${data.url_banner}" alt="${data.description}">
          <span>${informationStatus(data) || ""}</span>
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
            <button 
              type="button"
              id="confirmar-pedido"
              data-productid="${data.id}"
              class="button-finalizar button-confirm"
            >
              ${validarTypeDeliveryModal(data)}
            </button>
          </form>
        `;

        // Corrige o disabled corretamente
        const buttonConfirm = modalBody.querySelector(".button-confirm");
        buttonConfirm.disabled = !!data.cooking;

        getOptionsDelivery(id);

        buttonConfirm.addEventListener("click", () => {
          const productId = buttonConfirm.dataset.productid;
          if (data.cooking) return;
          if (data.delivering) {
            confirmarPedido(id);
            return;
          }
          confirmValuesCreditCard(productId);
        });

        // ---- ABRIR MODAL ----
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
        window.__modalOpen = true;

        // ---- FECHAR MODAL (X) ----
        span.onclick = function () {
          modal.style.display = "none";
          document.body.style.overflow = "";
          header.classList.remove("hide");
          window.__modalOpen = false;
        };

        // ---- FECHAR MODAL (clicando fora) ----
        modal.onclick = function (e) {
          if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
            header.classList.remove("hide");
            window.__modalOpen = false;
          }
        };

      } catch (erro) {
        console.error("Erro no fetch:", erro);
      } finally {
        hideLoading();
      }
    });
  });
}
