
import { URL_BASE_API } from "./domain.js";
export async function metodoSend(id) {

    try {
        const response = await fetch(`${URL_BASE_API}/restaurant/product/${id}`, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': true,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);

        const select = document.getElementById('send_method'); 

        const deliveryOption = select.querySelector('option[value="delivery"]');
        const establishmentOption = select.querySelector('option[value="establishment"]');

        if (!data.pick_up_with_delivery && deliveryOption) {
          
        }  select.removeChild(deliveryOption);

        if (!data.pick_up_with_establishment && establishmentOption) {
            select.removeChild(establishmentOption);
        }

    } catch (erro) {
        console.log("Erro na requisição:", erro);
    }
}
