//estudar e pensar mais antes de continuarrr aaa

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


export async function metodoSend() {
    try{
        const { data } = await fetch("https://d41d75f43ca7.ngrok-free.app/restaurant/product/${pick_up_with_delivery}");
        console.log(data);
    } catch (erro) {
        console.log(erro);
    }
}

//pensar na logica que vou usar 
