import { URL_BASE_API } from "./domain.js";

async function statusPedido(cardId, novoStatus) {
  try {
    const response = await fetch(`${URL_BASE_API}/restaurant/product/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          cooking: novoStatus,
          delivering: true
        })
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar pedido");
    }

    const pedidoAtualizado = await response.json();
    console.log("Pedido atualizado:", pedidoAtualizado);

  } 
  catch (error) {
    console.error(error);
  }
}