
export function validarStatusDeliveryMenu(item) {
  if (!item) return "Item inválido";
  
  if (item.available === false) return "Indisponível";
  if (item.cooking) return "Preparando...";
  if (item.delivering) return "Acompanhar";
  
  return "Comprar";
}

export function informationStatus(item) {
  if (item.available === false) return "Produto temporariamente indisponível";
  if (item.cooking) return "Seu pedido está sendo preparado";
  if (item.delivering) {
    if (item.type_delivering === "delivery") return "📍 Pedido saiu para entrega";
    if (item.type_delivering === "establishment") return "🏪 Aguardando retirada";
  }
  return "";
}


export function validarTypeDeliveryModal(item) {
  if (!item) return "Item inválido";

  if (item.cooking) return "Preparando pedido...";
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

export function date_format(value) {
  const date = new Date(value);

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    year: '2-digit' 
  });

  return formatter.format(date); 
}

export function rigth_alert(){
  
  Swal.fire({
  title: "Pedido concluido!",
  text: "Você está com o pedido em mãos, aproveite!",
  icon: "success"
});
}

export function error_alert(){
  
 Swal.fire({
  icon: "error",
  title: "Erro",
  text: "Tente novamente!",
});
}

