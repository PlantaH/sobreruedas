//--ENTIDADES----------------------------------------------------------------------------------------------------------------------
class Cliente{
    constructor(usuario,clave,log) {      
        this.usuario  = usuario.toUpperCase();
        this.clave  = clave.toUpperCase();
        this.log = log;
    }        
    miEstado() {
        return this.log;
    } 
   
};
//--FIN ENTIDADES---------------------------------------------------------------------------------------------------------------------

//--VARIABLES-------------------------------------------------------------------------------------------------------------------------
let formularioLogin = document.getElementById("formularioLogin");
//--FIN VARIABLES---------------------------------------------------------------------------------------------------------------------

//--EVENTOS---------------------------------------------------------------------------------------------------------------------------
formularioLogin.addEventListener("submit",guardarDatos)
//--FIN EVENTOS-----------------------------------------------------------------------------------------------------------------------

//--FUNCIONES-------------------------------------------------------------------------------------------------------------------------
function guardarDatos(e){
    
    e.preventDefault();

    let usuario = document.querySelector("#usuarioLogin").value
    let clave = document.querySelector("#claveLogin").value
    
    if ((usuario == 'juan') && (clave =='perez'))  {
        const nuevoCliente = new Cliente(usuario,clave,true);
        
        localStorage.setItem("dataCliente", JSON.stringify(nuevoCliente));
       
        window.location='shop.html'
    } else {
        console.log('Error')
    }
}
//--FIN FUNCIONES--------------------------------------------------------------------------------------------------------------------

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
let usuario = JSON.parse(localStorage.getItem("dataCliente"));

if (usuario != null) { window.location='shop.html' };
//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------

