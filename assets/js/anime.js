//--FUNCIONES------------------------------------------------------------------------------------------------------------------
/* agradece cuando se agrega un producto al carrito */
const mostrarMensajeItemAgregado = () =>{      
    Swal.fire({
        icon: 'success',
        title: 'Gracias',
        text: 'El producto se agrego al carrito!',
        footer: ''
      })
}

/*Muestra cartel avisando que se vacio el carrito */
const mostrarMensajeEliminarCarrito = () =>{   
    $("#mensajeEliminados").css({      
      "height":"30px",
    })
    .slideDown(1500)
    .slideUp(1500)
}

/* Muestra cartel de ofertas */
const mostrarMensajeOfertas = () =>{   
    $("#mensajeBienvenida").css({           
      "color":"blue",
      "font-size":"20px"
    })
    .slideDown(1500)
    .delay(2000) 
    .slideUp(2500);
    setTimeout(() => { 
        mostrarMensajeOfertas();
    }, 2000);
} 

/* Oculta header en checkout */
const ocultarHeaderCheckOut = () =>{   
    $(".gridBannerPrincipal")
        .slideUp(2000)
        .delay(2000) 
    }
//--FIN FUNCIONES------------------------------------------------------------------------------------------------------------------