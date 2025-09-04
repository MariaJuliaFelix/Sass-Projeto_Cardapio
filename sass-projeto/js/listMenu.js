import { URL_BASE_API } from "./domain";
import { buttonInformations } from "./buttonInformation";
import { renderMenu } from "./renderMenu";

async function getMenu() {
  try {
    const response = await fetch(`${URL_BASE_API}/restaurant/menu`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': true,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    renderMenu(data);
    buttonInformations();
  } catch (erro) {
    console.error(erro);
  }
}
setInterval(async () => {
  getMenu();
}, 10000);
