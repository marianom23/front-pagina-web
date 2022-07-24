
// export async function mercadopago() {
//     if (cartItems.length > 0) {
//         const user = {
//             id: Number(localStorage.getItem("id")),
//             nombre: localStorage.getItem("nombre"),
//             email: localStorage.getItem("email"),
//             type_identification: localStorage.getItem("type_identification"),
//             number_identification: localStorage.getItem("number_identification"),
//         }
//         const dataSendMP = {
//             producto_mercado_pago: cartItems,
//             usuario: user,
//         }
//         console.log(dataSendMP)
//         try {
//             const resp = await fetch("https://el-buen-sabor.herokuapp.com/mercado-pago/pagar", {
//                 method: "POST",
//                 body: JSON.stringify(dataSendMP),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })

//             if (resp.status !== 200) {
//                 window.alert("Error al pagar. \nIntentelo nuevamente más tarde")
//             }
//             const preference = await resp.json();


//             // Esto es lo que necesitamos hacer :: Llamar a la api de mercadopago
//             // npm install mercadopago
//             // luego importarla para poder utilizarla y enviar una preference.

//             // const responseMP = await mercadopago.preferences.create(preference)
//             // console.log("responseMP", responseMP)
//             // const respMP = await mercadopago.preferences
            
//             var script = document.createElement("script");
//             console.log("preference:", preference)
//             console.log("script", script)
//             console.log("script.dataset", script.dataset)
            
//             // The source domain must be completed according to the site for which you are integrating.
//             // For example: for Argentina ".com.ar" or for Brazil ".com.br".
//             script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
//             script.type = "text/javascript";


//             script.dataset.preferenceId = preference.id;
//             // console.log("preference.init_point", preference.init_point)
//             // script.src = preference.init_point;
//             // script.type = "text/html";
//             // document.getElementById("cartContainer").innerHTML = `<button onclick="location.href='${script.src}'" type="button">
//             // Pagar MercadoPago</button>`;

//             document.getElementById("cartContainer").innerHTML = "";
            
//             document.querySelector("#cartContainer").appendChild(script);

//             console.log("Todo bien")
//             console.log("Preference ID:", script.dataset.preferenceId)
//         } catch {
//             window.alert("Error al pagar. \nIntentelo nuevamente más tarde")
//         }
//     } else {
//         window.alert("No se encontraron artículos en el carrito.")

//     }


// }