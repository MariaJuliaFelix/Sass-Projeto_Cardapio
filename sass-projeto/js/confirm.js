import { URL_BASE_API } from "./domain.js";

export async function confirm() {
    
    function confirm_delivery(){
        
    }

    if(delivery){
        if (delivering) delivery = true; 
        if (type_delivering) type = "delivery";

        response.send(confirm_delivery)
    } else{
        response.send("Não é possivel entrega")
    }

    if(establishment){
        if (delivering) establishment = true; 
        if (type_delivering) type = "establishment";

        response.send(confirm_delivery)
    } else{
        response.send("Não é possivel entrega")
    }

    try{
        const response = await fetch(`${URL_BASE_API}/restaurant/product/confirm/{id}`)
    }
}









    //   const confirm_pay = {
    //    if delivering === true //bool
    //    type delivering === delivery or establishment //string

    // };

        // const jsonString = JSON.stringify(confirm_pay)

        // try {
        // const responseponse = await fetch(`${URL_BASE_API}/responsetaurant/product/pay/${idProduct}`, {
        //     method: "POST",
        //     headers: {
        //     "ngrok-skip-browser-warning": true,
        //     "Content-Type": "application/json",
        //     },
        //     body: jsonString,
        // });

        // if (!responseponse.ok) {
        //     const errorData = await responseponse.json();
        //     console.error("Erro do servidor:", errorData);
        //     alert(`Erro: ${errorData.message || "Não foi possível processar o pagamento"}`);
        //     return;
        // }

        // const data = await responseponse.json();
        // console.log("Pagamento aprovado:", data);
        // console.log(jsonString)
        // alert("Pagamento realizado com sucesso!");
        // } catch (error) {
        // console.error("Erro ao processar pagamento:", error);
        // alert("Ocorreu um erro na comunicação com o servidor.");
        // }

        // console.log(idProduct)
        // }