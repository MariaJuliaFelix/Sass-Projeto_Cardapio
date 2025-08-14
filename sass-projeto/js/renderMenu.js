export function renderMenu(items) {
    const containerMenu = document.querySelector("#container_menu");
    containerMenu.innerHTML = items.map(item =>
        `<div class="card-menu">
            <img src="${item.url_banner}" alt="${item.description}">
            <p class="descricao">${item.description}</p>
            <p class="valor">R$ ${item.price}</p>
            <button class="button-comprar" data-id="${item.id}">Comprar</button>
        </div>`
    ).join("");
}
