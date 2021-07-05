/* */
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


/* */ 
const nuevoCliente = new Cliente('');

let listaProductos = [];
listaProductos.push( new Producto("moto","M-001","CFMOTO 450L", "5999",true,"0","../img/motos/moto3.jpg","2021"));
listaProductos.push( new Producto("bici","B-001","KTM Fat Rat", "350",true,"","../img/bicis/bici1.jpg","2021"));
listaProductos.push( new Producto("cuatri","C-001","CFORCE 600", "3500",true,"","../img/cuatris/cuatri1.jpg","2021"));
listaProductos.push( new Producto("cuatri","C-002","CFMOTO 450L", "1500",false,"25000","../img/cuatris/cuatri2.jpg","2015"));
listaProductos.push( new Producto("moto","M-002","TANGO 125I", "3500",false,"600","../img/motos/moto4.jpg","2020"));
 
/* */
function cargarProductos(){
    let html_in='';
    let i = 0;
    let c = 0;
    for (const prod of listaProductos){
        i += 1;    
        c += 1;

        
        if (c == 1) html_in = html_in + '<div class="row" id="ads">' 

        html_in = html_in + '<div class="col-md-4 padCard">'
        html_in = html_in + '<div class="card rounded">'
        html_in = html_in + '<div class="card-image">'                                                                                   
        html_in = html_in + '<span class="card-notify-year">' + prod.miAnio() + '</span>' 
        if (prod.esNueva())  html_in = html_in + '<span class="card-notify-badge">Nueva!</span>'
        html_in = html_in + '<img class="img-fluid imagenProductoLista" src="' + prod.miFoto() + '" alt="' +  prod.miNombre() + '" />'
        html_in = html_in + '</div>'
        html_in = html_in + '<div class="card-image-overlay m-auto">'
        html_in = html_in + '<span class="card-detail-badge">' + prod.esNuevaUsada() + '</span>'
        html_in = html_in + '<span class="card-detail-badge">u$d ' + prod.miPrecio() + '</span>'
        html_in = html_in + '<span class="card-detail-badge">' + prod.miKms() + ' Kms</span>'
        html_in = html_in + '</div>'
        html_in = html_in + '<div class="card-body text-center">'
        html_in = html_in + '<div class="m-auto">'
        html_in = html_in + '<h5 class="titulo">' +  prod.miNombre() + ' </h5>'
        html_in = html_in + '</div>'
        html_in = html_in + '<a class="ads__botonDetalle" href="../views/detalle.html">Ver</a>'
        html_in = html_in + '</div>'
        html_in = html_in + '</div>'
        html_in = html_in + '</div>'   
        
        if (c == 3) {
            html_in = html_in + '</div>'
            c = 0;
        }
         
    };

    //Carga HTML con productos
    document.getElementById('html_in').innerHTML = html_in
     
}
/* */

function verProducto(p){    
    const prod =  listaProductos[p-1];

    let msj = '[' + prod.miCodigo()  + '] '  + prod.miNombre() + ' el precio es de ' + prod.miPrecio();
    
    if ((prod.miTipo()!="BICI") && (prod.miKms()!=""))  
        msj += ' tiene ' + prod.miKms() + ' kms' ;      
    
    if (prod.esNueva())
        msj += ' el producto es Nuevo' ;  
    else
        msj += ' el producto es usado' ;  
         
    if (prod.estado())
        msj += ' y esta vendido' ;  
    else
        msj += ' y esta disponible' ;  
    
    document.getElementById('producto' + p ).innerHTML = msj;
}
 
function venderProducto(p){   
    const prod =  listaProductos[p-1];    
    alert(nuevoCliente.miNombre() + ' : '  + prod.vender());     
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
 

/* */
cargarProductos();

nuevoCliente.comoTeLlamas()
/* */