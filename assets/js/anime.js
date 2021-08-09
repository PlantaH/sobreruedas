//--FUNCIONES------------------------------------------------------------------------------------------------------------------
/* Modal que agradece cuando se agrega un producto al carrito */
const mostrarMensajeAgregado = () =>{   
    $('#mensajeAgrego').modal('show');
}

/*Muestra cartel avisando que se vacio el carrito */
const mostrarMensajeEliminado = () =>{   
    $("#mensajeEliminados").css({      
      "height":"30px",
    })
    .slideDown(1500)
    .slideUp(1500)
}

/* Muestra cartel de ofertas */
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

/* Oculta header en checkout */
const mostrarMensajeCheckOut = () =>{   
    $(".gridBannerPrincipal")
        .slideUp(2000)
        .delay(2000) 
    }
//--FIN FUNCIONES------------------------------------------------------------------------------------------------------------------