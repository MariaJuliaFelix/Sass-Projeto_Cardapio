import { URL_BASE_API } from "./domain.js";

export async function confirmarPedido(itemId) {
  try {
    console.log(`🔍 Tentando confirmar pedido ${itemId}...`);
    
    const response = await fetch(`${URL_BASE_API}/restaurant/product/confirm/${itemId}`, {
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: null
    });

    console.log(`📡 Status da resposta: ${response.status}`);
    
    // Se a resposta for OK (200-299), considera sucesso
    if (response.ok) {
      console.log("✅ Pedido confirmado com sucesso!");
      return true; // Retorna sucesso
    } else {
      console.log(`❌ Erro HTTP: ${response.status}`);
      // Mesmo com erro HTTP, tenta processar a resposta
      try {
        const errorData = await response.json();
        console.log("📦 Dados do erro:", errorData);
      } catch (e) {
        console.log("📦 Resposta de erro não é JSON");
      }
      return false; // Retorna falha
    }
    
  } catch (erro) {
    console.error("❌ Erro na confirmação:", erro);
    return false; // Retorna falha
  }
}