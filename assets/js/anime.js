//--FUNCIONES------------------------------------------------------------------------------------------------------------------

const mostrarMensajeAgregado = () =>{   
    $('#mensajeAgrego').modal('show');
}

const mostrarMensajeEliminado = () =>{   
    $("#mensajeEliminados").css({      
      "height":"30px",
    })
    .slideDown(1500)
    .slideUp(1500)
}


const mostrarMensajeBienvenida = () =>{   
    $("#mensajeBienvenida").css({           
      "color":"blue",
      "font-size":"20px"
    })
    .slideDown(1500)
    .delay(2000) 
    .slideUp(2500);
    setTimeout(() => { 
        mostrarMensajeBienvenida();
    }, 2000);
} 

const mostrarMensajeCheckOut = () =>{   
    $(".gridBannerPrincipal")
        .slideUp(2000)
        .delay(2000) 
    }
//--FIN FUNCIONES------------------------------------------------------------------------------------------------------------------