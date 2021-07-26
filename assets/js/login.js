//--ENTIDADES----------------------------------------------------------------------------------------------------------------------
class Cliente{
    constructor(usuario,clave,log) {      
        this.usuario  = usuario.toUpperCase();
        this.clave  = usuario.toUpperCase();
        this.log = log;
    }        
    miEstado() {
        return this.log;
    } 
   
};


let formularioLogin = document.getElementById("formularioLogin");
formularioLogin.addEventListener("submit",guardarDatos)

function guardarDatos(e){
    
    e.preventDefault();

    let usuario = document.querySelector("#usuarioLogin").value
    let clave = document.querySelector("#claveLogin").value
    
    if ((usuario == 'juan') && (clave =='perez'))  {
        const nuevoCliente = new Cliente(usuario,clave,true);
        
        localStorage.setItem("dataCliente", JSON.stringify(nuevoCliente));

        console.log(JSON.parse(localStorage.getItem("dataCliente")));


       // window.location='shop.html'
    } else {
        console.log('Error')
    }
}

//--LOGICA-------------------------------------------------------------------------------------------------------------------------
//nuevoCliente.comoTeLlamas();

//cargarNombreCliente();
//cargarSaludoCliente();

if (sessionStorage.getItem('dataCliente') != null){
    console.log(1)
}else{
    console.log(2)
}

//--FIN LOGICA---------------------------------------------------------------------------------------------------------------------

