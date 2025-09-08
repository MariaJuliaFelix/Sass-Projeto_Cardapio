import { price, validarStatusDeliveryMenu, informationStatus } from "./services.js";

export function renderMenu(items) {
  console.log("Itens recebidos:", items);
  const containerMenu = document.querySelector("#container_menu");
  containerMenu.innerHTML = items.map(item => {
    const status = validarStatusDeliveryMenu(item);
    return (
      `<div class="card-menu" id="card-${item.id}">
          <img src="${item.url_banner}" alt="${item.description}">
          <p class="descricao">${item.description}</p>
          <p class="valor">${price(item.price)}</p>
          <span>${informationStatus(item)}</span>
       <button ${item.cooking ? "disabled" : ""} class="button-comprar" data-id="${item.id}">${status}</button>
      </div>`
    )
  }).join("");
}

// import { validarStatusDeliveryMenu, informationStatus, price } from "./services.js";

// export function renderMenu(menuItems) {
//   const container = document.getElementById("menu_container");
//   if (!container) return;

//   container.innerHTML = ""; // limpa antes de renderizar

//   menuItems.forEach(item => {
//     // cria o card do produto
//     const card = document.createElement("div");
//     card.classList.add("card-produto");

//     card.innerHTML = `
//       <img src="${item.url_banner}" alt="${item.description}">
//       <h2>${item.description}</h2>
//       <p>${price(item.price)}</p>
//       <span class="status-info">${informationStatus(item) || ""}</span>
//       <button 
//         class="button-comprar"
//         data-id="${item.id}">
//         ${validarStatusDeliveryMenu(item)}
//       </button>
//     `;

//     container.appendChild(card);
//   });
// }
