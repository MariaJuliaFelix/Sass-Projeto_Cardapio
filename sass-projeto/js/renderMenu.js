import { price } from "./services.js";
// import { confirm} from "./confirm.js";
import { monitorarEntrega } from "./loopMenu.js";

export function renderMenu(items) {
  const containerMenu = document.querySelector("#container_menu");

  containerMenu.innerHTML = items.map(item =>
    `<div class="card-menu" id="card-${item.id}">
        <img src="${item.url_banner}" alt="${item.description}">
        <p class="descricao">${item.description}</p>
        <p class="valor">${price(item.price)}</p>
        <button class="button-comprar" data-id="${item.id}">Comprar</button>
        <p class="status-entrega" id="status-${item.id}"></p>
    </div>`
  ).join("");

  containerMenu.querySelectorAll(".button-comprar").forEach(button => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.id;
      confirm(itemId); 
    });
  });

  items.forEach(item => monitorarEntrega(item.id));
  
}
