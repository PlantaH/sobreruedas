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
    
    if ((usuario != '') && (clave !=''))  {
        const nuevoCliente = new Cliente(usuario,clave,true);
        
        localStorage.setItem("dataCliente", JSON.stringify(nuevoCliente));
       
        window.location='shop.html'
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No pudimos encontrar tu usuario.',
            footer: 'Por favor completa tu usuario y clave.'
          })
    }
}
//--FIN FUNCIONES--------------------------------------------------------------------------------------------------------------------

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
let usuario = JSON.parse(localStorage.getItem("dataCliente"));

if (usuario != null) { window.location='shop.html' }; // Si encuentra que el usuario esta logueado lo redirecciona directamente al shop
//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------

