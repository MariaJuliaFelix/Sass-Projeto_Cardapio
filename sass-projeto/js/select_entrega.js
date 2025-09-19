export function atualizarVisibilidadeEndereco(modalBody) {
  const sendMethodSelect = modalBody.querySelector('#send_method');
  const cepCard = modalBody.querySelector('.cep-card');
  const enderecoEstablishment = modalBody.querySelector('.endereco_establishment');

  const val = sendMethodSelect?.value;
  if (val === 'delivery') {
    if (cepCard) cepCard.style.display = 'block';
    if (enderecoEstablishment) enderecoEstablishment.style.display = 'none';
    const cepInput = modalBody.querySelector('#cep');
    if (cepInput) cepInput.focus();
  } else if (val === 'establishment') {
    if (cepCard) cepCard.style.display = 'none';
    if (enderecoEstablishment) enderecoEstablishment.style.display = 'flex';
  } else {
    if (cepCard) cepCard.style.display = 'none';
    if (enderecoEstablishment) enderecoEstablishment.style.display = 'none';
  }
}

export function ligarListenerSelectEntrega(modalBody) {
  const sendMethodSelect = modalBody.querySelector('#send_method');
  if (!sendMethodSelect) return;
  
  sendMethodSelect.replaceWith(sendMethodSelect.cloneNode(true));
  const novoSelect = modalBody.querySelector('#send_method');
  novoSelect.addEventListener('change', () => atualizarVisibilidadeEndereco(modalBody));
}
