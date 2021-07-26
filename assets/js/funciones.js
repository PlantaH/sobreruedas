//--ENTIDADES----------------------------------------------------------------------------------------------------------------------
class Cliente{
    constructor(nombre) {      
        this.nombre  = nombre.toUpperCase();
    }
        
    miNombre() {
        return this.nombre.toUpperCase();
    } 
    comoTeLlamas() {
        this.nombre  = prompt("Hola estas entrando al listado de productos","Ingresa tu nombre");
    } 
};

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
localStorage.setItem('saludos', ['Hola!','Hi!','Hallo!','Ciao!','Salut!','Yassou!','Hej!','Oi!']);
sessionStorage.setItem('mostrarItems','3');

const saludosCliente = localStorage.getItem('saludos');

const nuevoCliente = new Cliente('');

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

const btnVerTodos   = document.querySelector("#btnVerTodos")  
const btnVerBicis   = document.querySelector("#btnVerBicis") 
const btnVerMotos   = document.querySelector("#btnVerMotos") 
const btnVerCuatris = document.querySelector("#btnVerCuatris") 

const btnOrdenarCodigo = document.querySelector("#btnOrdenarCodigo")
const btnOrdenarNombre = document.querySelector("#btnOrdenarNombre")
const btnOrdenarPrecio = document.querySelector("#btnOrdenarPrecio")

const btnMostrarMas = document.querySelector("#btnMostrarMas")




//--FIN VARIABLES------------------------------------------------------------------------------------------------------------------

 
//--EVENTOS------------------------------------------------------------------------------------------------------------------------
btnMostrarMas.onclick = () => { 
                    let mostrarItems = 3 + parseInt(sessionStorage.getItem('mostrarItems'));
                    sessionStorage.setItem('mostrarItems',mostrarItems);
                    cargarProductos();                           
                    };

btnVerTodos.onclick = () => { filtrarProductos('') };
btnVerBicis.onclick = () => { filtrarProductos('bici') };
btnVerMotos.onclick = () => { filtrarProductos('moto') };
btnVerCuatris.onclick = () => { filtrarProductos('cuatri') };

btnOrdenarCodigo.onclick = () => { ordenarProductos('codigo') };
btnOrdenarNombre.onclick = () => { ordenarProductos('nombre') };
btnOrdenarPrecio.onclick = () => { ordenarProductos('precio') };

function saludoRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cargarSaludoCliente(){
    let lista   =  saludosCliente.split(",");
    let div = saludoClienteHtml;
    div.textContent = lista[saludoRandom(0, lista.length -1)]
}
function cargarNombreCliente(){    
    let div = nombreClienteHtml;
    div.textContent = nuevoCliente.miNombre().substring(0,10)
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

    for (const prod of listaProductos){
        i += 1;
        //3
        let t3_s1 = document.createElement("span");
        //t3_s1.setAttribute("class", "card-notify-year")
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
       
        //4
        let t5_s1 = document.createElement("span");
        t5_s1.setAttribute("class", "card-detail-badge");
        t5_s1.textContent =  prod.esNuevaUsada();
        let t5_s2 = document.createElement("span");
        t5_s2.setAttribute("class", "card-detail-badge");
        t5_s2.textContent = 'u$d ' + prod.miPrecio();
        let t5_s3 = document.createElement("span");
        t5_s3.setAttribute("class", "card-detail-badge");
        t5_s3.textContent = prod.miKms()+ ' Kms';
        let t4_d1 = document.createElement("div");
        t4_d1.setAttribute("class", "card-image-overlay m-auto");
        t4_d1.appendChild(t5_s1);
        t4_d1.appendChild(t5_s2);
        t4_d1.appendChild(t5_s3);
       
        //5
        let t5_h5 = document.createElement("h5");
        t5_h5.setAttribute("class", "titulo");
        t5_h5.textContent =  prod.miNombre();
        let t5_d2 = document.createElement("div");
        t5_d2.setAttribute("class", "m-auto");
        t5_d2.appendChild(t5_h5);
        let t5_a = document.createElement("a");
        t5_a.setAttribute("class", "ads__botonDetalle");
        t5_a.setAttribute("href", "../views/detalle.html");
        t5_a.textContent =  'Ver';
        let t5_d1 = document.createElement("div");
        t5_d1.setAttribute("class", "card-body text-center");
        t5_d1.appendChild(t5_d2);
        t5_d1.appendChild(t5_a);
        
        //2
        let t2_d1 = document.createElement("div");
        t2_d1.setAttribute("class", "card rounded");
        t2_d1.appendChild(t3_d1);
        t2_d1.appendChild(t4_d1);
        t2_d1.appendChild(t5_d1);
       
        //1
        let t1_d1 = document.createElement("div");
        t1_d1.setAttribute("class", "col-md-4 padCard");
        t1_d1.style.paddingBottom = "20px";
        t1_d1.appendChild(t2_d1);
               
        
        t0_d1.setAttribute("class", "row");
        t0_d1.setAttribute("id", "ads");
        t0_d1.appendChild(t1_d1);

        if ( i == sessionStorage.getItem('mostrarItems') ) break;
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
//--FIN EVENTOS--------------------------------------------------------------------------------------------------------------------

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
//nuevoCliente.comoTeLlamas();

//cargarNombreCliente();
//cargarSaludoCliente();

cargarProductos();

//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------