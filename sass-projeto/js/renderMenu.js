import { price, validarStatusDeliveryMenu, informationStatus } from "./services.js";

export function renderMenu(items) {
  const containerMenu = document.querySelector("#container_menu");
  containerMenu.innerHTML = items.map(item => {
    const status = validarStatusDeliveryMenu(item);
    return (
      `<div class="card-menu" id="card-${item.id}">
          <img src="${item.url_banner}" alt="${item.description}">
          <p class="descricao">${item.description}</p>
          <p class="valor">${price(item.price)}</p>
          <span>${informationStatus(item)}</span>
          <button disabled="${item.cooking}" class="button-comprar" data-id="${item.id}">${status}</button>
      </div>`
    )
  }).join("");
}