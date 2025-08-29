
export function validarDelivery(item) {
  if (!item) return "Item inválido";

  if (item.delivering) {
    if (item.type_delivering === "delivery") return "Entrega disponível (delivery)";
    if (item.type_delivering === "establishment") return "Entrega disponível (no estabelecimento)";
  }
  return "Não é possível entrega";
}