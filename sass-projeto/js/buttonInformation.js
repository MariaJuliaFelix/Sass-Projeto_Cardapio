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
button.onclick = async function () {
const id = this.dataset.id;
try {
showLoading();
header.classList.add("hide");


const response = await fetch(`${URL_BASE_API}/restaurant/product/${id}`, {
method: 'GET',
headers: {
'ngrok-skip-browser-warning': 'true',
'Content-Type': 'application/json'
}
});
if (!response.ok) throw new Error("Erro na requisição: " + response.status);
const data = await response.json();


modalBody.innerHTML = `
    <h2>${data.description}</h2>
    <img class="img-information" src="${data.url_banner}" alt="${data.description}">
    <span class="modal-status">${informationStatus(data) || ""}</span>
    <h3>${price(data.price)}</h3>
    <div class="select-lista">
        <select id="send_method">
            <option value="">Escolha o método de envio</option>
            <option id="delivery" value="delivery">Entrega do pedido</option>
            <option id="establishment" value="establishment">Retirada do pedido</option>
        </select>
    </div>
    <div class="endereco">
        <h2>Coloque o endereço para entrega</h2>
        <input id="cep" placeholder="Coloque o seu CEP" type="text">
    </div>
    <div class="endereco_establishment">
        <h2>Endereço para retirada do pedido</h2>
        <iframe class="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49510816.39016882!2d-152.0254347!3d40.764215000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9e15bf1c1%3A0xafe511716724bf3f!2sburger%20joint!5e0!3m2!1sen!2sbr!4v1758062150655!5m2!1sen!2sbr" width="450" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p>Oswaldo Moretti 151 Jardim Frei Aurelio - Garça-SP</p>
    </div>
    <form class="forma_de_pagamento" id="form-pay">
    <h2>Forma de pagamento</h2>

    <section>
        <div class="cartao_countainer">
            <div class="img_cartao">
                <img src="img/cartao/chip.png">
                <img src="img/cartao/sinal.png">
            </div>
            <h4 class="nome_cartao">Nome completo</h4>
            <h4 class="num_cartao">3456789098765432</h4>
            <div class="sep-textos">
            <p>XX/XX</p>
            <p>XXX</p>
            </div>
        </div>
    </section>

    <div class="cartao" >
        <input id="credit_card_name" placeholder="Nome no cartão" type="text">
        <input id="credit_card_number" placeholder="Número do cartão" type="text">
        <input id="credit_card_date" placeholder="Validade (MM/AA)" type="text">
        <input id="credit_card_code" placeholder="CVV" type="password">
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
const buttonConfirm = modalBody.querySelector(".button-confirm");

buttonConfirm.disabled = !!data.cooking;

getOptionsDelivery(id);

buttonConfirm.onclick = () => {
const productId = buttonConfirm.dataset.productid;
if (data.cooking) return;


if (data.delivering) {
confirmarPedido(id);
modal.style.display = "none";
document.body.style.overflow = "";
header.classList.remove("hide");
window.__modalOpen = false;
return;
}

confirmValuesCreditCard(productId);
};


modal.style.display = "flex";
document.body.style.overflow = "hidden";
window.__modalOpen = true;


span.onclick = function () {
modal.style.display = "none";
document.body.style.overflow = "";
header.classList.remove("hide");
window.__modalOpen = false;
};


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
};
});
}