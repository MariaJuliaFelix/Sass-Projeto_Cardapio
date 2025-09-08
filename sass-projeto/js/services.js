// Sempre que mostrar no cardápio
export function validarStatusDeliveryMenu(item) {
  if (!item) return "Item inválido";

  // Se não houver pedido ainda, sempre mostra "Comprar"
  if (!item.hasOrder) {
    return "Comprar";
  }

  // A partir daqui, só mexe se o item já tem pedido feito
  if (item.cooking) {
    return "Preparando pedido...";
  }
  if (item.delivering) {
    return "Acompanhar pedido";
  }
  return "Comprar";
}

export function informationStatus(item) {
  if (!item || !item.hasOrder) return ""; // sem pedido, sem info extra

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
    return "Fazer pedido"; // estado inicial padrão
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
