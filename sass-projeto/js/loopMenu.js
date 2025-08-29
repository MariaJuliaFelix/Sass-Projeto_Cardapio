import { URL_BASE_API } from "./domain.js";

export function monitorarEntrega(itemId, interval = 10000) {
 setInterval(async () => {

    try {
      const response = await fetch(`${URL_BASE_API}/restaurant/product/${itemId}`);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Erro ao buscar item ${itemId}: Servidor retornou status ${response.status}`, errorBody);
        throw new Error("Erro ao buscar item");
      }

      const item = await response.json();
      const statusMessage = validarDelivery(item);

      const statusEl = document.getElementById(`status-${itemId}`);
      if (statusEl) statusEl.textContent = statusMessage;

    } catch (erro) {
        console.log("Erro na requisição:", erro);
    }
  }, interval);
}

