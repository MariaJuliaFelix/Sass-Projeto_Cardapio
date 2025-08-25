// import { URL_BASE_API } from "./domain.js";

// export async function pay() {
//     const cardNameInput = document.getElementById("credit_card_name");
//     const cardNumberInput = document.getElementById("credit_card_number");
//     const cardDateInput = document.getElementById("credit_card_date");
//     const cardCodeInput = document.getElementById("credit_card_code");

//     const cardName = cardNameInput.value.trim();
//     const cardNumber = cardNumberInput.value.trim();
//     const cardDate = cardDateInput.value;
//     const cardCode = cardCodeInput.value;
    
// const showErro = (field, errorText) => {
//   field.classList.add("erro");
//   const errorElement = document.createElement("small");
//   errorElement.classList.add("error-text");
//   errorElement.innerText = errorText;
//   field.closest(".form-group").appendChild(errorElement);
// }

//     if (cardName === "") {
//       showErro(cardNameInput, "Preencha com seu nome");
//     }
//     if (cardNumber === "") {
//       showErro(cardNumberInput, "Preencha com o número do cartão");
//     }
//     if (cardDate === "") {
//       showErro(cardDateInput, "Preencha com a data");
//     }
//     if (cardCode === "") {
//       showErro(cardCodeInput, "Preencha com o codigo");
//     }
  

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

export function formPay(id) {
  const formPay = document.getElementById("form-pay");

  const showErro = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
  };

  const clearErrors = () => {
    document.querySelectorAll(".error-text").forEach((el) => el.remove());
    document.querySelectorAll(".erro").forEach((el) =>
      el.classList.remove("error")
    );
  };

  formPay.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    clearErrors();

    const cardNameInput = document.getElementById("credit_card_name");
    const cardNumberInput = document.getElementById("credit_card_number");
    const cardDateInput = document.getElementById("credit_card_date");
    const cardCodeInput = document.getElementById("credit_card_code");

    const cardName = cardNameInput.value.trim();
    const cardNumber = cardNumberInput.value.trim();
    const cardDate = cardDateInput.value;
    const cardCode = cardCodeInput.value;

    let hasError = false;

    if (cardName === "") {
      showErro(cardNameInput, "Preencha com seu nome");
      hasError = true;
    }
    if (cardNumber === "") {
      showErro(cardNumberInput, "Preencha com o número do cartão");
      hasError = true;
    }
    if (cardDate === "") {
      showErro(cardDateInput, "Preencha com a data");
      hasError = true;
    }
    if (cardCode === "") {
      showErro(cardCodeInput, "Preencha com o código");
      hasError = true;
    }

    if (hasError) return;

    const formData = new FormData(formPay);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(
        `${URL_BASE_API}/restaurant/product/pay/${id}`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Erro na requisição");

      const result = await response.json();
      alert("Pagamento realizado com sucesso!");
      console.log("Resposta da API:", result);
    } catch (err) {
      alert("Não foi possível processar o pagamento.");
      console.error("Erro:", err);
    }
  });
}








// import { URL_BASE_API } from "./domain.js";

// export function formPay(id){

// const formPay = document.getElementById('form-pay')

// formPay.addEventListener('submit', evento => {
//   evento.preventDefault();
 
//   const formData = new FormData(formPay);
//   const data = Object.fromEntries(formData);

//       try {
//         const response = await fetch(`${URL_BASE_API}/restaurant/product/pay/${id}`, {
//           method: 'POST',
//           headers: {
//             'ngrok-skip-browser-warning': true,
//             'Content-Type': 'application/json'
//           }
//         });

//         body: JSON.stringify(data)
//         .then(res => {
//           if (!res.ok) throw new Error("Erro na requisição");
//           return res.json();
//         })
//         .then(response => {
//           alert("Pagamento realizado com sucesso!");
//           console.log("Resposta da API:", response);
//         })
//         .catch(err => {
//           alert("Não foi possível processar o pagamento.");
//           console.error("Erro:", err);
//         });
// }







// fetch(`${URL_BASE_API}/restaurant/product/pay/`, {
//   method: 'POST',
//   headers: {
//     'ngrok-skip-browser-warning': true,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })

