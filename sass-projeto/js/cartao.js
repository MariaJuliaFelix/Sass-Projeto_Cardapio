export function sincronia_card(modalBody) {
  if (!modalBody) return;

  const cardName = modalBody.querySelector('#card_name');
  const cardNumber = modalBody.querySelector('#card_number');
  const cardDate = modalBody.querySelector('#card_date');
  const cardCode = modalBody.querySelector('#card_code');

  const inputcardName = modalBody.querySelector('#credit_card_name');
  const inputcardNumber = modalBody.querySelector('#credit_card_number');
  const inputcardDate = modalBody.querySelector('#credit_card_date');
  const inputcardCode = modalBody.querySelector('#credit_card_code');

  if (inputcardName) inputcardName.addEventListener('input', () => { if (cardName) cardName.textContent = inputcardName.value || 'Nome completo'; });
  if (inputcardNumber) inputcardNumber.addEventListener('input', () => { if (cardNumber) cardNumber.textContent = inputcardNumber.value || '**** **** **** *****'; });
  if (inputcardDate) inputcardDate.addEventListener('input', () => { if (cardDate) cardDate.textContent = inputcardDate.value || 'MM/AA'; });
  if (inputcardCode) inputcardCode.addEventListener('input', () => { if (cardCode) cardCode.textContent = inputcardCode.value || 'CVV'; });
}
