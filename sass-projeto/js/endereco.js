export function consultaCEP(modal) {
    const cepInput = modal.querySelector('#cep');
    const logradouroInput = modal.querySelector('#logradouro');
    const bairroInput = modal.querySelector('#bairro');

    const cep = cepInput.value.trim();
    if (!cep) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            logradouroInput.value = data.logradouro || '';
            bairroInput.value = data.bairro || '';
        })
        .catch(err => console.error(err));
}
