//estudar e pensar mais antes de continuarrr aaa

import { URL_BASE_API } from "./domain";

// export function metodo() {

//     const entrega = document.querySelectorAll('#entrega')
//     const retirada = document.querySelectorAll('#retirada')

// if(entrega == true){
//       const response = await fetch("https://d41d75f43ca7.ngrok-free.app/restaurant/menu", {
//             method: 'GET',
//             headers: {
//                 'ngrok-skip-browser-warning': true,
//                 'Content-Type': 'application/json'
//             }
// } 

import { URL_BASE_API } from "./domain.js";

export async function metodoSend() {
    try{
        const { data } = await fetch(`URL_BASE_APIURL_BASE_API/restaurant/product/`);
        console.log(data);
    } catch (erro) {
        console.log(erro);
    }
}

//pensar na logica que vou usar 
// verificar com data qual metodo esta true e qual esta false 
// if true vai conseguir ver a opçao 
// else nao vai aparecer a opçao
