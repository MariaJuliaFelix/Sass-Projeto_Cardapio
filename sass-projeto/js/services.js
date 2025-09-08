 export function validarStatusDeliveryMenu(item) {
    if (!item) return "Item inválido";
    if (item.cooking) {
      return "Preparando pedido...";
    }
    if (item.delivering) {
      return "Acompanhar pedido";
    }
    return "Comprar";
  }

  export function informationStatus(item) {
    if (item.cooking) {
      return `alguma info de preparo`;
    }
    if (item.delivering) {
      if (item.type_delivering === "delivery") return `pedido saiu para entrega`;
      if (item.type_delivering === "establishment") return `aguardando retirada no estabelecimento`;
    }
  }

  export function validarTypeDeliveryModal(item) {
    if (!item) return "Item inválido";
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
