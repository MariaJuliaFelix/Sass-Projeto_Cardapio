// import { URL_BASE_API } from "./domain.js";

// export async function pay() {
//     const cardName = document.getElementById("credit_card_name").value
//     const cardNumber = document.getElementById("credit_card_number").value
//     const cardDate = document.getElementById("credit_card_date").value
//     const cardCode = document.getElementById("credit_card_code").value

//     const body = {
//       "credit_card_name": cardName,
//       "credit_card_number": cardNumber,
//       "credit_card_date": cardDate,
//       "credit_card_code": cardCode
//     }

//    try {
//         const response = await fetch(`${URL_BASE_API}/restaurant/product/pay/`, {
//           method: 'POST',
//           headers: {
//             'ngrok-skip-browser-warning': true,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(body)
//         });
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error("Erro ao processar pagamento:", error);
//     }

//     console.log(body);
// }

import { URL_BASE_API } from "./domain.js";

export function formPay(){

const formPay = document.getElementById('form-pay')

formPay.addEventListener('submit', evento => {
  evento.preventDefault();

  const formData = new FormData(formPay);
  const data = Object.fromEntries(formData);

  fetch(`${URL_BASE_API}/restaurant/product/pay/`, {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
})

}