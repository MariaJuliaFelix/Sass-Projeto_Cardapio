export function validarDelivery(item) {
  if (!item) return "Item inválido";

  if (item.cooking) {
    return "Preparando pedido...";
  }

  if (item.delivering) {
    if (item.type_delivering === "delivery") return "Saiu para entrega (delivery)";
    if (item.type_delivering === "establishment") return "Pronto para retirada no estabelecimento";
  }

  return "Pedido recebido, aguardando confirmação";
}
