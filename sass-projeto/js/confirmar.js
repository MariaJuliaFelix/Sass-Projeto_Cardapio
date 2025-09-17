import { URL_BASE_API } from "./domain.js";
import { getMenu } from "./listMenu.js";

export async function confirmarPedido(itemId) {
  try {
    const response = await fetch(`${URL_BASE_API}/restaurant/product/confirm/${itemId}`, {
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: null
    });

    if (!response.ok) throw new Error("Erro ao confirmar pedido");

    const card = document.getElementById(`card-${itemId}`);
    if (card) {
      card.dataset.hasOrder = "false";
      card.dataset.cooking = "false";
      card.dataset.delivering = "false";
    }

    getMenu();

    console.log("Pedido confirmado (usuário):", itemId);
  }
  catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}



// Swal.fire({
//   title: "Confirmar pedido!",
//   icon: "success",
//   draggable: true
// });

// //button_confirm 
// lemrar de colocar quando o loop já tiver ocorrido e o pedido já ter chego não esquecerrr de formatar a data!!!!!!!!