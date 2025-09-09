import { price, validarStatusDeliveryMenu, informationStatus } from "./services.js";

export function renderMenu(items) {

console.log("Itens recebidos:", items);
const containerMenu = document.querySelector("#container_menu");
if (!containerMenu) return;


containerMenu.innerHTML = items.map(item => {
const status = validarStatusDeliveryMenu(item);
return (
`
<div class="card-menu" id="card-${item.id}" data-product-id="${item.id}"
data-has-order="${!!item.hasOrder}" data-cooking="${!!item.cooking}"
data-delivering="${!!item.delivering}" data-type-delivery="${item.type_delivering || ''}">
<img src="${item.url_banner}" alt="${item.description}">
<p class="descricao">${item.description}</p>
<p class="valor">${price(item.price)}</p>
<span class="status-info">${informationStatus(item)}</span>
<button ${item.cooking ? "disabled" : ""} class="button-comprar" data-id="${item.id}">${status}</button>
</div>`
)
}).join("");
}