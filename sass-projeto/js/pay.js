import { URL_BASE_API } from "./domain.js";
import { getMenu } from "./listMenu.js"; 
import { error_alert, rigth_alert } from "./services.js";
const showErro = (field, errorText) => {
  field.classList.add("erro");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest(".cartao").appendChild(errorElement);
};

const clearErrors = () => {
  document.querySelectorAll(".error-text").forEach((el) => el.remove());
  document.querySelectorAll(".erro").forEach((el) =>
    el.classList.remove("erro")
  );
};

export async function confirmValuesCreditCard(idProduct) {
  clearErrors();

  const cardNameInput = document.getElementById("credit_card_name");
  const cardNumberInput = document.getElementById("credit_card_number");
  const cardDateInput = document.getElementById("credit_card_date");
  const cardCodeInput = document.getElementById("credit_card_code");
  const sendMethodSelect = document.getElementById("send_method");

  const cardName = cardNameInput?.value.trim().toUpperCase();
  const cardNumber = cardNumberInput?.value.replace(/\s+/g, "");
  const cardDate = cardDateInput?.value.trim();
  const cardCode = cardCodeInput?.value.trim();
  const pickUp = sendMethodSelect?.value;

  let hasError = false;

  if (!cardName) {
    showErro(cardNameInput, "Preencha com seu nome");
    hasError = true;
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    showErro(cardNumberInput, "Número do cartão inválido (precisa ter 16 dígitos)");
    hasError = true;
  }

  const dateRegex = /^(\d{2})\/(\d{2})$/;
  if (!dateRegex.test(cardDate)) {
    showErro(cardDateInput, "Data inválida (use MM/AA)");
    hasError = true;
  } else {
    const [_, mm, yy] = cardDate.match(dateRegex);
    const month = parseInt(mm, 10);
    const year = 2000 + parseInt(yy, 10);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (month < 1 || month > 12) {
      showErro(cardDateInput, "Mês inválido");
      hasError = true;
    } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
      showErro(cardDateInput, "Cartão vencido");
      hasError = true;
    }
  }

  if (!/^\d{3,4}$/.test(cardCode)) {
    showErro(cardCodeInput, "Código de segurança inválido");
    hasError = true;
  }

  if (hasError) return;

  const body = {
    credit_card_name: cardName,
    credit_card_number: cardNumber,
    credit_card_date_expiration: cardDate,
    credit_card_code: cardCode,
    pick_up: pickUp
  };

  try {
    const response = await fetch(`${URL_BASE_API}/restaurant/product/pay/${idProduct}`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro do servidor:", errorData);
      alert(`Erro: ${errorData.message || "Não foi possível processar o pagamento"}`);
      error_alert()
      return;
    }

    const data = await response.json();
    console.log("Pagamento aprovado:", data);

    const modal = document.getElementById('meuModal');
    const header = document.querySelector('header');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      if (header) header.classList.remove('hide');
      window.__modalOpen = false;
    }

    getMenu();

    alert("Pagamento realizado com sucesso!");
    rigth_alert()
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    alert("Ocorreu um erro na comunicação com o servidor.");
  }
}
