import { URL_BASE_API } from "./domain.js";

const cardName = cardName.querySelector("#credit_card_name");
const cardNumber = cardNumber.querySelector("#credit_card_number");
const cardDate = cardDate.querySelector("#credit_card_date");
const cardCode = cardCode.querySelector("#credit_card_code");

export function pay() {
   try {
        const response = await fetch(`${URL_BASE_API}/restaurant/product/pay/}`, {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
    };
}