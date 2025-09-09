export function validarStatusDeliveryMenu(item) {
  if (!item) return "Item inválido";

  if (!item.hasOrder) {
    return "Comprar";
  }

  if (item.cooking == true) {
    return "Preparando pedido...";
  }
  if (item.delivering  == true) {
    return "Acompanhar pedido";
  }
  return "Comprar";
}

export function informationStatus(item) {
  if (!item || !item.hasOrder) return ""; 

  if (item.cooking) {
    return `Seu pedido está sendo preparado`;
  }
  if (item.delivering) {
    if (item.type_delivering === "delivery") return `Pedido saiu para entrega`;
    if (item.type_delivering === "establishment") return `Aguardando retirada no estabelecimento`;
  }
  return "";
}

export function validarTypeDeliveryModal(item) {
  if (!item) return "Item inválido";

  if (!item.hasOrder) {
    return "Fazer pedido"; 
  }

  if (item.cooking) {
    return "Preparando pedido...";
  }
  if (item.delivering) {
    if (item.type_delivering === "delivery") return "Confirmar entrega";
    if (item.type_delivering === "establishment") return "Confirmar a retirada";
  }
  return "Fazer pedido";
}

export function price(value) {
  return new Intl.NumberFormat("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
  }).format(value);
}
