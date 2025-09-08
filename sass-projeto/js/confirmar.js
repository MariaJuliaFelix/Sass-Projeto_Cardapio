import { URL_BASE_API } from "./domain.js";

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

    // Atualiza o botão no cardápio
    const button = document.querySelector(`button[data-id="${itemId}"]`);
    if (button) button.textContent = "Acompanhar pedido";

    // Marca o item como tendo um pedido ativo (frontend)
    const productElement = document.querySelector(`[data-id="${itemId}"]`);
    if (productElement) {
      productElement.dataset.hasOrder = "true"; 
    }

    console.log("Pedido confirmado!");
  }
  catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}
