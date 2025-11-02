import { price, validarTypeDeliveryModal, informationStatus } from "./services.js";
import { showLoading, hideLoading } from "./loading.js";
import { getOptionsDelivery } from "./optionsSelectDelivery.js";
import { URL_BASE_API } from "./domain.js";
import { confirmValuesCreditCard } from "./pay.js";
import { confirmarPedido } from "./confirmar.js";
import { consultaCEP } from "./endereco.js";
import { sincronia_card } from "./cartao.js";
import { atualizarVisibilidadeEndereco, ligarListenerSelectEntrega } from "./select_entrega.js";

export function buttonInformations() {
    const buttons = document.querySelectorAll(".button-comprar");
    const modal = document.getElementById("meuModal");
    const span = modal.querySelector(".fechar");
    const modalBody = modal.querySelector("#modal-body");
    const header = document.querySelector("header");

    buttons.forEach(button => {
        button.onclick = async function () {
            const id = this.dataset.id;
            console.log(`🔄 Clicou no produto ID: ${id}`);
            
            try {
                showLoading();
                header.classList.add("hide");

                // Buscar dados do produto
                const response = await fetch(`${URL_BASE_API}/restaurant/product/${id}`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) throw new Error("Erro na requisição: " + response.status);
                
                const data = await response.json();

                // VERIFICAÇÃO DE DISPONIBILIDADE
                if (data.available === false) {
                    hideLoading();
                    header.classList.remove("hide");
                    Swal.fire({
                        icon: "error",
                        title: "Produto Indisponível",
                        text: "Este produto está temporariamente fora de estoque",
                    });
                    return;
                }

                // SE ESTÁ ENTREGANDO/RETIRANDO - MOSTRA CONFIRMAÇÃO APP DELIVERY
                if (data.delivering) {
                    modalBody.innerHTML = `
                        <div class="delivery-confirmation">
                            <div class="delivery-header">
                                <div class="delivery-icon">
                                    ${data.type_delivering === "delivery" ? "🚚" : "🏪"}
                                </div>
                                <h2>Pedido Chegou!</h2>
                                <p class="delivery-subtitle">
                                    ${data.type_delivering === "delivery" 
                                        ? "Seu entregador chegou!" 
                                        : "Seu pedido está pronto para retirada!"
                                    }
                                </p>
                            </div>
                            
                            <div class="delivery-content">
                                <div class="order-card">
                                    <img src="${data.url_banner}" alt="${data.description}" class="order-image">
                                    <div class="order-info">
                                        <h3>${data.description}</h3>
                                        <p class="order-price">${price(data.price)}</p>
                                        <p class="order-status">
                                            ${data.type_delivering === "delivery" 
                                                ? "📦 Entregador aguardando na porta" 
                                                : "🛍️ Aguardando na loja"
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="confirmation-message">
                                    <p>Confirme que você recebeu o pedido:</p>
                                </div>
                                
                                <button class="confirm-delivery-btn" data-productid="${data.id}">
                                    <span class="btn-icon">✅</span>
                                    ${data.type_delivering === "delivery" 
                                        ? "Confirmar Recebimento" 
                                        : "Confirmar Retirada"
                                    }
                                </button>
                                
                                <p class="delivery-note">
                                    ${data.type_delivering === "delivery" 
                                        ? "Verifique se está tudo certo com seu pedido antes de confirmar" 
                                        : "Confirme apenas após verificar seu pedido"
                                    }
                                </p>
                            </div>
                        </div>
                    `;

                    const confirmBtn = modalBody.querySelector(".confirm-delivery-btn");
                    confirmBtn.addEventListener("click", async () => {
                        // Animação de loading no botão
                        confirmBtn.innerHTML = '<span class="btn-icon">⏳</span> Confirmando...';
                        confirmBtn.disabled = true;
                        
                        try {
                            await confirmarPedido(data.id);
                            
                            // Feedback visual de sucesso
                            confirmBtn.innerHTML = '<span class="btn-icon">🎉</span> Confirmado!';
                            confirmBtn.style.background = "#28a745";
                            
                            // Fecha modal após 1.5 segundos
                            setTimeout(() => {
                                closeModal();
                                // Mostra alerta de sucesso
                                Swal.fire({
                                    title: "Pedido Finalizado!",
                                    text: "Obrigado pela confirmação!",
                                    icon: "success",
                                    confirmButtonText: "👍 Ótimo!"
                                });
                            }, 1500);
                            
                        } catch (error) {
                            confirmBtn.innerHTML = '<span class="btn-icon">❌</span> Erro ao Confirmar';
                            confirmBtn.style.background = "#dc3545";
                            setTimeout(() => {
                                closeModal();
                            }, 2000);
                        }
                    });

                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    window.__modalOpen = true;
                    hideLoading();
                    return;
                }

                // SE ESTÁ PREPARANDO - MOSTRA MODAL INFORMATIVO
                if (data.cooking) {
                    modalBody.innerHTML = `
                        <div class="delivery-confirmation">
                            <div class="delivery-header">
                                <div class="delivery-icon">👨‍🍳</div>
                                <h2>Pedido em Preparo</h2>
                                <p class="delivery-subtitle">Estamos preparando seu pedido com carinho!</p>
                            </div>
                            
                            <div class="delivery-content">
                                <div class="order-card">
                                    <img src="${data.url_banner}" alt="${data.description}" class="order-image">
                                    <div class="order-info">
                                        <h3>${data.description}</h3>
                                        <p class="order-price">${price(data.price)}</p>
                                        <p class="order-status">♨️ Cozinha em ação!</p>
                                    </div>
                                </div>
                                
                                <div class="confirmation-message">
                                    <p>Seu pedido será entregue em instantes</p>
                                </div>
                                
                                <button class="confirm-delivery-btn" onclick="closeModal()" style="background: #6c757d;">
                                    <span class="btn-icon">⏰</span>
                                    Aguardando Preparo
                                </button>
                                
                                <p class="delivery-note">
                                    Você receberá uma notificação quando o pedido estiver a caminho
                                </p>
                            </div>
                        </div>
                    `;

                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    window.__modalOpen = true;
                    hideLoading();
                    return;
                }

                // SE ESTÁ DISPONÍVEL - MOSTRA MODAL DE COMPRA NORMAL
                modalBody.innerHTML = `
                    <h2>${data.description}</h2>
                    <img class="img-information" src="${data.url_banner}" alt="${data.description}">
                    <span class="modal-status">${informationStatus(data) || ""}</span>
                    <h3>${price(data.price)}</h3>
                    <div class="select-lista">
                        <select id="send_method">
                            <option value="">Escolha o método de envio</option>
                            <option value="delivery">Entrega do pedido</option>
                            <option value="establishment">Retirada do pedido</option>
                        </select>
                    </div>
                   <div class="cep-card">
                        <form id="form-cep">
                            <h3>Endereço para entrega</h3>
                            
                            <div class="cep-group">
                                <div >
                                    <label for="cep">CEP</label>
                                    <input type="text" name="cep" id="cep" placeholder="00000-000" required>
                                </div>
                                <button type="button" id="buscar-cep">
                                    Buscar
                                </button>
                            </div>
                            
                            <div>
                                <label for="logradouro">Logradouro</label>
                                <input type="text" name="logradouro" id="logradouro" required>
                            </div>
                            
                            <div>
                                <label for="bairro">Bairro</label>
                                <input type="text" name="bairro" id="bairro" required>
                            </div>
                        </form>
                    </div>
                    <div class="endereco_establishment">
                        <h2>Endereço para retirada do pedido</h2>
                        <iframe class="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49510816.39016882!2d-152.0254347!3d40.764215000000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9e15bf1c1%3A0xafe511716724bf3f!2sburger%20joint!5e0!3m2!1sen!2sbr!4v1758062150655!5m2!1sen!2sbr" width="450" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <p>Oswaldo Moretti 000 Jardim - Garça-SP</p>
                    </div>
                    <form class="forma_de_pagamento" id="form-pay">
                        <h2>Forma de pagamento</h2>
                        <section> 
                            <div class="cartao_countainer"> 
                                <div class="img_cartao">
                                    <img src="img/cartao/chip.png"> 
                                    <img src="img/cartao/sinal.png"> 
                                </div>
                                <h4 id="card_name" class="nome_cartao">Nome completo</h4> 
                                <h4 id="card_number" class="num_cartao">**** **** **** *****</h4> 
                                <div class="sep-textos"> 
                                    <p id="card_date">XX/XX</p> 
                                    <p id="card_code">XXX</p> 
                                </div> 
                            </div> 
                        </section>
                        <div class="cartao">
                            <input id="credit_card_name" placeholder="Nome no cartão" type="text">
                            <input id="credit_card_number" placeholder="Número do cartão" type="text">
                            <input id="credit_card_date" placeholder="Validade (MM/AA)" type="text">
                            <input id="credit_card_code" placeholder="CVV" type="password">
                        </div>
                        <button
                            type="button"
                            id="confirmar-pedido"
                            data-productid="${data.id}"
                            class="button-finalizar button-confirm"
                        >
                            ${validarTypeDeliveryModal(data)}
                        </button>
                    </form>
                `;

                // Configurar eventos para compra normal
                atualizarVisibilidadeEndereco(modalBody);
                ligarListenerSelectEntrega(modalBody);

                const buttonBuscarCEP = modalBody.querySelector('#buscar-cep');
                buttonBuscarCEP.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    consultaCEP(modalBody);
                });

                const buttonConfirm = modalBody.querySelector(".button-confirm");
                getOptionsDelivery(id);
                sincronia_card(modalBody);

                // Configurar clique do botão confirmar para compra
                buttonConfirm.onclick = () => {
                    const productId = buttonConfirm.dataset.productid;
                    confirmValuesCreditCard(productId);
                };

                // Abrir modal
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
                window.__modalOpen = true;

            } catch (erro) {
                console.error("❌ Erro:", erro);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível carregar o produto",
                });
                header.classList.remove("hide");
            } finally {
                hideLoading();
            }
        };
    });

    // Fechar modal
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
        header.classList.remove("hide");
        window.__modalOpen = false;
    }

    span.onclick = closeModal;
    modal.onclick = function (e) {
        if (e.target === modal) closeModal();
    };
}