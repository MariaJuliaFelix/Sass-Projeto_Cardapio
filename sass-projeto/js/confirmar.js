import { URL_BASE_API } from "./domain.js";

export async function confirmar(itemId) {
  try {
    const response = await fetch(`${URL_BASE_API}/restaurant/product/confirm/${itemId}`, {
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify,
    });

    if (!response.ok) throw new Error("Erro ao confirmar pedido");

    const button = document.querySelector(`button[data-id="${itemId}"]`);
    if (button) button.textContent = "Acompanhar pedido";

    console.log("Pedido confirmado!");
  } 
  catch (erro) {
    console.error("Erro na requisição:", erro);
  }
}
