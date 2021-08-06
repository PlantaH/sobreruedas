//--VARIABLES-----------------------------------------------------------------------------------------------------------------------
let usuarioLogueado = JSON.parse(localStorage.getItem("dataCliente"));

let carrito = JSON.parse(localStorage.getItem("carrito"));
 
const listaCarritoHtml = document.getElementById("html_in");
const btnComprar = document.getElementById("btnComprar");



//--FIN VARIABLES------------------------------------------------------------------------------------------------------------------

//--FUNCIONES----------------------------------------------------------------------------------------------------------------------
function limpiarItemsCarrito(){
    btnComprar.style.visibility = "hidden";

    sessionStorage.removeItem('totalCarrito');
    sessionStorage.setItem("totalCarrito", 0);

    let div = listaCarritoHtml;
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function listarCarrito(){    
    let vcarrito = JSON.parse(localStorage.getItem("carrito"))
   
    if (localStorage.getItem("carrito") != null) {
       
        vcarrito.forEach( element => {   
            let total = element.itemPrecio * element.cantidad ;

            let t3_s1 = document.createElement("span");         
            t3_s1.setAttribute("class","text-muted"); 
            t3_s1.setAttribute("style","cursor:pointer");            
            t3_s1.setAttribute("onclick", `eliminarItem('${element.itemCodigo}')`)
            t3_s1.textContent =  `eliminar`

            let t3_s2 = document.createElement("span");         
            t3_s2.setAttribute("class","text-muted"); 
            t3_s2.textContent =  `U$D ${total}`

            
            let t3_h1 = document.createElement("h6");         
            t3_h1.setAttribute("class","my-0");
            t3_h1.textContent =  `${element.itemNombre}`
            let t3_m1 = document.createElement("small");         
            t3_m1.setAttribute("class","my-0");
            t3_m1.textContent =  `${element.itemCodigo} x ${element.cantidad} item/s ` 
            let t3_d1 = document.createElement("div");
            t3_d1.appendChild(t3_h1);
            t3_d1.appendChild(t3_m1);

            let t3_l1 = document.createElement("li");
            t3_l1.setAttribute("class","list-group-item d-flex justify-content-between lh-condensed");
            t3_l1.appendChild(t3_d1);
            t3_l1.appendChild(t3_s1);  
            t3_l1.appendChild(t3_s2);             

            let imprimir = listaCarritoHtml;
            imprimir.appendChild(t3_l1); 

            sessionStorage.setItem("totalCarrito", parseFloat(sessionStorage.getItem("totalCarrito")) + parseFloat(total));

        });
        

        
    } else { 
        console.log('no hay nada')
    }
   
}
function listarTotal(){  

    let t3_s1 = document.createElement("span");         
    t3_s1.setAttribute("class","my-0");    
    t3_s1.textContent =  `Total (USD)`

    let t3_s2 = document.createElement("span");         
    t3_s2.setAttribute("class","text-muted");    
    t3_s2.textContent =  `U$D ${sessionStorage.getItem("totalCarrito")}`

    let t3_l1 = document.createElement("li");
    t3_l1.setAttribute("class","list-group-item d-flex justify-content-between");
    t3_l1.appendChild(t3_s1);
    t3_l1.appendChild(t3_s2); 

    let imprimir = listaCarritoHtml;
    imprimir.appendChild(t3_l1); 

    if (parseFloat(sessionStorage.getItem("totalCarrito"))>0) btnComprar.style.visibility = "visible";
                         

}
function eliminarItem(v){
    limpiarItemsCarrito();
    sessionStorage.setItem("totalCarrito", 0);

    let borrar = JSON.parse(localStorage.getItem("carrito"))
    let actualizo = borrar.filter(e => e.itemCodigo != v)
    localStorage.setItem("carrito", JSON.stringify(actualizo))
    
    listarCarrito()
    listarTotal()
}
//--FIN FUNCIONES------------------------------------------------------------------------------------------------------------------

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
if (usuarioLogueado == null) {
    window.location='login.html'
}
 
limpiarItemsCarrito()

listarCarrito()

listarTotal()

mostrarMensajeCheckOut()
 
//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------
