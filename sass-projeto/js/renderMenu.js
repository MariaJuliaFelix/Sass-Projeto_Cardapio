import { price, validarStatusDeliveryMenu, informationStatus } from "./services.js";

export function renderMenu(items) {
  console.log("Renderizando menu visual:", items);
  const containerMenu = document.querySelector("#container_menu");
  if (!containerMenu) {
    console.log(" Container #container_menu não encontrado!");
    return;
  }

  containerMenu.innerHTML = items.map(item => {
    const status = validarStatusDeliveryMenu(item);
    const emPromocao = item.promotion === true;
    const indisponivel = item.available === false;
    
    const precoPromocional = emPromocao ? (item.price * 0.8).toFixed(2) : null;

    let classeCSS = '';
    if (indisponivel) classeCSS = 'indisponivel';
    if (emPromocao) classeCSS = 'promocao';

    return `
      <div class="card-menu ${classeCSS}" id="card-${item.id}">
        ${emPromocao ? `<div class="badge-desconto">-20%</div>` : ''}
        
        <img src="${item.url_banner}" alt="${item.description}">
        
        <p class="descricao">${item.description}</p>
        
        <div class="valor">
          ${emPromocao ? `
            <span class="preco-original">${price(item.price)}</span>
            <span class="preco-promocao">${price(precoPromocional)}</span>
          ` : price(item.price)}
        </div>
        
        <span class="status-info">${informationStatus(item)}</span>
        
        <button class="button-comprar ${classeCSS}" data-id="${item.id}">
          ${status}
        </button>
      </div>
    `;
  }).join("");

  console.log(" Menu renderizado visualmente!");
}