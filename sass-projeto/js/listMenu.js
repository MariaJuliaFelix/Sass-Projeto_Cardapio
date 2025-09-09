import { URL_BASE_API } from "./domain.js";
import { buttonInformations } from "./buttonInformation.js";
import { renderMenu } from "./renderMenu.js";

export async function getMenu() {
try {
const response = await fetch(`${URL_BASE_API}/restaurant/menu`, {
method: 'GET',
headers: {
'ngrok-skip-browser-warning': 'true',
'Content-Type': 'application/json'
}
});


if (!response.ok) {
throw new Error(`Erro HTTP: ${response.status}`);
}


const data = await response.json();
console.log("Resposta da API:", data);
renderMenu(data);
buttonInformations();
} catch (erro) {
console.error("Erro na requisição do menu:", erro);
}
}

getMenu();
const interval = 10000;
setInterval(() => {
  if (window.__modalOpen) return;
  getMenu();
}, interval);
