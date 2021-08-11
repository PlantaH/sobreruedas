
class Carrito {
    constructor(itemCodigo, itemNombre, itemPrecio, cantidad) {
        this.itemCodigo  = itemCodigo.toUpperCase();
        this.itemNombre  = itemNombre.toUpperCase();
        this.itemPrecio  = parseFloat(itemPrecio);    
        this.cantidad  = parseInt(cantidad);                
    }
}

class Producto {
    constructor(tipo,codigo,nombre, precio,nueva,kms,foto,anio) {
        this.tipo  = tipo.toUpperCase();
        this.codigo  = codigo.toUpperCase();        
        this.nombre  = nombre.toUpperCase();
        this.precio  = parseFloat(precio);
        this.nueva = nueva;
        this.kms  = kms.toUpperCase();
        this.foto= foto;
        this.anio = anio;
        this.vendido = false;
    }
        
    miCodigo() {
        return this.codigo.toUpperCase();
    }
    miPrecio() {
        return this.precio;
    }
    miNombre() {
        return this.nombre.toUpperCase();
    }
    miTipo() {
        return this.tipo.toUpperCase();
    }
    miFoto() {
        return this.foto;
    }
    miAnio() {
        return this.anio;
    }
    estado() {
        return this.vendido;
    }
    esNueva() {
        return this.nueva;
    }
    esNuevaUsada() {
        if (this.nueva)
            return 'Nueva'
        else
            return 'Usada';
    }
    miKms() {
        return this.kms;
    }

    vender() {
        if (!this.vendido){
            this.vendido = true;
            return "Gracias por tu compra!"
        }else{
            return "No se puede comprar ya esta vendido!"
        }

    }
    
}
//--FIN ENTIDADES------------------------------------------------------------------------------------------------------------------

//--VARIABLES----------------------------------------------------------------------------------------------------------------------

let usuarioLogueado = JSON.parse(localStorage.getItem("dataCliente"));

localStorage.setItem('saludos', ['Buen dia','Buenas tardes','Buenas noches']);
const saludosCliente = localStorage.getItem('saludos');

sessionStorage.setItem('mostrarItems','3'); 

let carritoItems = []

let listaProductosAll = [];
let listaProductos = [];
listaProductos.push( new Producto("moto","M-001","CFMOTO 450L", "5999",true,"0","../img/motos/moto3.jpg","2021"));
listaProductos.push( new Producto("bici","B-001","KTM Fat Rat", "350",true,"","../img/bicis/bici1.jpg","2021"));
listaProductos.push( new Producto("cuatri","C-001","CFORCE 600", "3500",true,"","../img/cuatris/cuatri1.jpg","2021"));
listaProductos.push( new Producto("cuatri","C-002","CFMOTO 450L", "1500",false,"25000","../img/cuatris/cuatri2.jpg","2015"));
listaProductos.push( new Producto("moto","M-002","TANGO 125I", "3500",false,"600","../img/motos/moto4.jpg","2020"));
listaProductos.push( new Producto("bici","B-002","KTM R2R CROSS", "150",false,"","../img/bicis/bici2.jpg","2015"));
listaProductos.push( new Producto("bici","B-003","KTM CITY FUN 26.3", "599",false,"","../img/bicis/bici6.jpg","2019"));

listaProductosAll = listaProductos;

const listaProductosHtml = document.getElementById("html_in");
const nombreClienteHtml = document.getElementById("nombreCliente");
const saludoClienteHtml = document.getElementById("saludoCliente");
  
const btnMostrarMas = document.querySelector("#btnMostrarMas")

const btnItems = document.querySelector("#btnItems");
const btnLimpiar  = document.querySelector("#btnLimpiar");
const btnSalir = document.querySelector("#btnSalir")

const selOrden = document.querySelector("#selOrden")
const selMostrar = document.querySelector("#selMostrar")


const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
const selMoneda = document.querySelector("#selMoneda")



//--FIN VARIABLES------------------------------------------------------------------------------------------------------------------

 
//--EVENTOS------------------------------------------------------------------------------------------------------------------------
btnMostrarMas.onclick = () => { let mostrarItems = 3 + parseInt(sessionStorage.getItem('mostrarItems'));
                    sessionStorage.setItem('mostrarItems',mostrarItems);
                    cargarProductos();                           
                    }; 
 

btnSalir.onclick = () => { 
    localStorage.removeItem('dataCliente');
    window.location='login.html'
 };

 btnLimpiar.onclick = () => {     
    localStorage.removeItem('carrito');
    document.getElementById("btnItems").textContent = '(0)';  
   
    mostrarMensajeEliminado() //en anime.js
 };
 

selOrden.onchange = (e) => {     
    e.preventDefault();
    ordenarProductos( $('#selOrden').val() ) 
 };

 selMostrar.onchange = (e) => {     
    e.preventDefault();
    filtrarProductos( $('#selMostrar').val() )
 };


 btnItems.onclick = () => { 
    let vcarrito = JSON.parse(localStorage.getItem("carrito"));    
    
    if (localStorage.getItem("carrito") != null) 
        window.location='checkout.html'  ;     
 }

 
selMoneda.onchange = (e) => {     
    e.preventDefault();
    
    $('#html_in').html('<div class="loading" style="padding:50px"><img src="../img/loader.gif" alt="cargando" /><br/>Un momento, por favor...</div>');

    if ( $('#selMoneda').val() == "ARS"){ 

        $.ajax({
            method: "POST",
            url:  URLGET,
            data: '',
            error: function(respuesta){                
                parseFloat(sessionStorage.setItem('cambioARS',1));
                cargarProductos();
                $('#selMoneda').val('USD') 
            },
            success: function(respuesta){                
                let misDatos = respuesta;
                
                for (const dato of misDatos) {
                    if ( dato.casa.nombre == 'Dolar') {
                      parseFloat(sessionStorage.setItem('cambioARS', dato.casa.venta))
                    }
                };
                cargarProductos()
            }
        });
    }else{
        parseFloat(sessionStorage.setItem('cambioARS',1))
        cargarProductos()
    }
     
    
 };

 //--FIN EVENTOS---------------------------------------------------------------------------------------------------------------------

//--FUNCIONES------------------------------------------------------------------------------------------------------------------------
function saludoRandom(min, max) {
    let now = new Date();
    let hora = 100 + now.getHours();

    if ((hora>=105) && (hora<112)) return 0
    if ((hora>=112) && (hora<=119)) return 1  
    if ((hora>119) && (hora<105)) return 2 
}

function cargarSaludoCliente(){
    let lista   =  saludosCliente.split(",");
    let div = saludoClienteHtml;
    div.textContent = lista[saludoRandom(0, lista.length -1)]
}
function cargarNombreCliente(n){    
    let div = nombreClienteHtml;
    div.textContent = n.substring(0,10)
}

function limpiarProductos(){
    let div = listaProductosHtml;
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function cargarProductos(){
    let i = 0;

    limpiarProductos();

    let t0_d1 = document.createElement("div");

    let modoVer  = "siMostrarProducto";
    let moneda = "ar$" 

    for (const prod of listaProductos){
        i += 1;
         
        let t3_s1 = document.createElement("span");         
        t3_s1.classList.add("card-notify-year");
        t3_s1.textContent =  prod.miAnio();
         
        let t3_s2 = document.createElement("span");
        t3_s2.setAttribute("class", "card-notify-badge");
        t3_s2.textContent =  'Nueva!';
        
        let t3_i1 = document.createElement("img");
        t3_i1.setAttribute("class", "img-fluid imagenProductoLista");
        t3_i1.setAttribute("src", prod.miFoto());
        t3_i1.setAttribute("alt", prod.miNombre());
        let t3_d1 = document.createElement("div");
        t3_d1.setAttribute("class", "card-image");
        t3_d1.appendChild(t3_s1);
        if (prod.esNueva()) t3_d1.appendChild(t3_s2);
        t3_d1.appendChild(t3_i1);       
         
        let t5_s1 = document.createElement("span");
        t5_s1.setAttribute("class", "card-detail-badge");
        t5_s1.textContent =  prod.esNuevaUsada();
        let t5_s2 = document.createElement("span");
        t5_s2.setAttribute("class", "card-detail-badge");
        if (parseFloat(sessionStorage.getItem('cambioARS')) == 1 ) moneda = "u$d"
        t5_s2.textContent = moneda + ' ' + prod.miPrecio() * parseFloat(sessionStorage.getItem('cambioARS'));
        let t5_s3 = document.createElement("span");
        t5_s3.setAttribute("class", "card-detail-badge");
        t5_s3.textContent = prod.miKms()+ ' Kms';
        let t4_d1 = document.createElement("div");
        t4_d1.setAttribute("class", "card-image-overlay m-auto");
        t4_d1.appendChild(t5_s1);
        t4_d1.appendChild(t5_s2);
        t4_d1.appendChild(t5_s3);       
         
        let t5_h5 = document.createElement("h5");
        t5_h5.setAttribute("class", "titulo");
        t5_h5.textContent =  prod.miNombre();
        let t5_d2 = document.createElement("div");
        t5_d2.setAttribute("class", "m-auto");
        t5_d2.appendChild(t5_h5);
        let t5_a = document.createElement("a");
        t5_a.setAttribute("class", "ads__botonDetalle");
        t5_a.setAttribute("id", "productoID");
        t5_a.setAttribute("onclick", "agregarCarrito('" + prod.miCodigo() +"')" );
        t5_a.textContent =  'Agregar';
        let t5_d1 = document.createElement("div");
        t5_d1.setAttribute("class", "card-body text-center");
        t5_d1.appendChild(t5_d2);
        t5_d1.appendChild(t5_a);        
        
        let t2_d1 = document.createElement("div");
        t2_d1.setAttribute("class", "card rounded");
        t2_d1.appendChild(t3_d1);
        t2_d1.appendChild(t4_d1);
        t2_d1.appendChild(t5_d1);       
         
        let t1_d1 = document.createElement("div");
        t1_d1.setAttribute("class", "col-md-4 padCard " + modoVer);
        t1_d1.style.paddingBottom = "20px";
        t1_d1.appendChild(t2_d1);               
        
        t0_d1.setAttribute("class", "row");
        t0_d1.setAttribute("id", "ads");
        t0_d1.appendChild(t1_d1);

        if ( i == sessionStorage.getItem('mostrarItems') ) modoVer = "noMostrarProducto";
    };
    
    let imprimir = listaProductosHtml;
    imprimir.appendChild(t0_d1);    
     
}
function ordenarProductos(m){   
    
    if (m == 'codigo'){
        listaProductos.sort(function(a, b){
            var nom1=a.codigo.toUpperCase(), nom2=b.codigo.toUpperCase();
            if (nom1 < nom2) return -1; 
            if (nom1 > nom2) return 1;
            return 0 ;
        })
    }
           
    if (m == 'nombre'){
        listaProductos.sort(function(a, b){
            var nom1=a.nombre.toUpperCase(), nom2=b.nombre.toUpperCase();
            if (nom1 < nom2) return -1; 
            if (nom1 > nom2) return 1;
            return 0 ;
        })
    }

    if (m == 'precio'){
        listaProductos.sort(function(a, b){
            return parseFloat(a.precio)-parseFloat(b.precio);
        })
    }

    
    cargarProductos();
   
}

function filtrarProductos(m){     
    
    listaProductos = listaProductosAll;     //Carga todos los productos

    if (m != '') listaProductos = listaProductos.filter(prod => prod.tipo.toUpperCase() == m.toUpperCase() );
   
    cargarProductos();
}


function agregarCarrito(v){    
   
    mostrarMensajeAgregado();

    let vcarrito = JSON.parse(localStorage.getItem("carrito"))


    if (localStorage.getItem("carrito") != null) {
        
        if (vcarrito.find(item => item.itemCodigo == v)) {
            vcarrito.find(item => item.itemCodigo == v).cantidad += 1;            
            localStorage.setItem("carrito", JSON.stringify(vcarrito))
        } else {      
             
            let nombre = listaProductos.find(item => item.codigo == v).miNombre()
            let precio = listaProductos.find(item => item.codigo == v).miPrecio()      

            let carritoItem = new Carrito(v,nombre,precio,1)
            vcarrito.push(carritoItem)
            localStorage.setItem("carrito", JSON.stringify(vcarrito))
        }
    } else { 
        let carritoItems = []

        let nombre = listaProductos.find(item => item.codigo == v).miNombre()
        let precio = listaProductos.find(item => item.codigo == v).miPrecio()

        let carritoItem =new Carrito(v,nombre,precio,1)
        carritoItems.push(carritoItem)
        localStorage.setItem("carrito", JSON.stringify(carritoItems))
    }
    
    cargaritemsCarrito()
}

function cargaritemsCarrito(){
    let vcarrito = JSON.parse(localStorage.getItem("carrito"));
    
    if (localStorage.getItem("carrito") != null) 
        document.getElementById("btnItems").textContent = '(' + vcarrito.length + ')';    
}
 

//--FIN FUNCIONES------------------------------------------------------------------------------------------------------------------

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
if (usuarioLogueado == null) {
    window.location='login.html'
}

if (sessionStorage.getItem('cambioARS') == null)  parseFloat(sessionStorage.setItem('cambioARS',1)) //Carga por defecto valor dolar

if (sessionStorage.getItem('cambioARS') == "1")
    $('#selMoneda').val('USD') 
else
    $('#selMoneda').val('ARS') 

cargarNombreCliente(usuarioLogueado.usuario);
cargarSaludoCliente();

mostrarMensajeBienvenida(); //en anime.js

cargaritemsCarrito()   
cargarProductos();
 
//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------
