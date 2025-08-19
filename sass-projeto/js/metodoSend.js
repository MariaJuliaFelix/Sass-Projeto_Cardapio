
import { URL_BASE_API } from "./domain.js";

export async function metodoSend() {
    try {
       
        const response = await fetch(`${URL_BASE_API}/restaurant/product/`);
        
        const data = await response.json();
        console.log(data);

        if (data.pick_up_with_delivery == true) {
            const deliveryElement = document.getElementById('delivery');
            if (deliveryElement==true) {
                console.log
            }
        } else {
             deliveryElement.remove();
        }

        if (data.pick_up_with_establishment == true) {
            const establishmentElement = document.getElementById('establishment');
            if (establishmentElement==true) {
                console.log
            }
        } else {
             establishmentElement.remove();
        }

    } catch (erro) {
        console.log("Erro na requisição:", erro);
    }
}


// Você está comparando deliveryElement == true, mas getElementById nunca retorna true ou false, ele retorna um elemento ou null. Esse if nunca vai ser verdade.

// Tem console.log sozinho sem nada — isso não faz nada e ainda vai dar erro.

// O else está tentando usar deliveryElement e establishmentElementElement fora do escopo em que foram declarados. Se a variável só existe dentro do if, o else não tem como usar.

// Você acabou duplicando o nome establishmentElementElement (provavelmente um erro de digitação).


//pensar na logica que vou usar 
// verificar com data qual metodo esta true e qual esta false 
// if true vai conseguir ver a opçao 
// else nao vai aparecer a opçao