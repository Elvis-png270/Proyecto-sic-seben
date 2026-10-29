// aqui agarro todo lo del formulario con querySelector, es como el getElementById pero usa # pa los id y . pa las clases
var formulario = document.querySelector("#formulario")
var nombre = document.querySelector("#nombre")
var correo = document.querySelector("#correo")
var personaje = document.querySelector("#personaje")
var seccion = document.querySelector("#seccion")
var mensaje = document.querySelector("#mensaje")
var acepto = document.querySelector("#acepto")
var errorTerminado = document.querySelector("#error-terminado")
var contadorLetras = document.querySelector("#contador-letras")
var listaMensajes = document.querySelector("#lista-mensajes")
var vacio = document.querySelector("#vacio")

// querySelectorAll agarra TODOS los que coincidan, aqui todos los campos que se tienen que revisar
var campos = document.querySelectorAll("#formulario .form-control, #formulario .form-select, #acepto")

// esto se pone en true cuando ya intentaste enviar una vez, pa que de ahi en adelante te vaya marcando los errores mientras escribes
var yaIntento = false

// revisa un campo nomas, el checkValidity() es de html5 y te dice true si cumple con el required, minlength, type email, etc
// classList.add le pone una clase y classList.remove se la quita, bootstrap pinta rojo con is-invalid y verde con is-valid
function revisarCampo(campo) {
  if (campo.checkValidity()) {
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true
  } else {
    campo.classList.remove("is-valid")
    campo.classList.add("is-invalid")
    return false
  }
}

// los radio son varios con el mismo name, entonces reviso si hay alguno con :checked (palomeado)
function revisarTerminado() {
  var escogido = document.querySelector("input[name='terminado']:checked")
  if (escogido == null) {
    errorTerminado.classList.add("mostrar-error")
    return false
  } else {
    errorTerminado.classList.remove("mostrar-error")
    return true
  }
}

// addEventListener es pa escuchar cosas que pasan, aqui el "input" pasa cada que escribes una letra
// el contador de letras se actualiza solo
mensaje.addEventListener("input", function () {
  contadorLetras.innerHTML = mensaje.value.length + " / 300"
})

// cuando ya intentaste enviar, cada que escribes o cambias algo se vuelve a revisar ese campo
// el forEach es como un for que pasa por cada campo de la lista
campos.forEach(function (campo) {
  campo.addEventListener("input", function () {
    if (yaIntento) {
      revisarCampo(campo)
    }
  })
  campo.addEventListener("change", function () {
    if (yaIntento) {
      revisarCampo(campo)
    }
  })
})

// lo mismo pa los radio
document.querySelectorAll("input[name='terminado']").forEach(function (radio) {
  radio.addEventListener("change", function () {
    if (yaIntento) {
      revisarTerminado()
    }
  })
})

// el "submit" pasa cuando le picas al boton de enviar
formulario.addEventListener("submit", function (e) {
  // el preventDefault() evita que la pagina se recargue al enviar, que es lo que hace un form normalmente
  e.preventDefault()
  yaIntento = true

  // reviso todos los campos y si alguno falla todoBien se hace false
  var todoBien = true
  campos.forEach(function (campo) {
    if (revisarCampo(campo) == false) {
      todoBien = false
    }
  })
  if (revisarTerminado() == false) {
    todoBien = false
  }

  if (todoBien == false) {
    Swal.fire({
      title: "Te faltó algo",
      text: "Revisa los campos que salen en rojo.",
      icon: "error",
      confirmButtonText: "Va, lo reviso",
      confirmButtonColor: "#b84a00"
    })
    return
  }

  // si todo esta bien armo el mensaje con lo que escribiste
  var nuevo = {
    nombre: nombre.value,
    personaje: personaje.value,
    seccion: seccion.value,
    terminado: document.querySelector("input[name='terminado']:checked").value,
    mensaje: mensaje.value,
    fecha: new Date().toLocaleDateString("es-MX")
  }

  // saco los mensajes que ya habia guardados, el JSON.parse convierte el texto guardado otra vez en lista
  // si no habia nada uso una lista vacia []
  var guardados = JSON.parse(localStorage.getItem("mensajesGTA")) || []
  guardados.push(nuevo)
  // el localStorage nomas guarda texto, por eso el JSON.stringify convierte la lista en texto
  localStorage.setItem("mensajesGTA", JSON.stringify(guardados))

  Swal.fire({
    title: "¡Mensaje enviado!",
    text: "Gracias " + nuevo.nombre + ", tu opinión ya salió en la lista.",
    icon: "success",
    confirmButtonText: "De nada",
    confirmButtonColor: "#237a30"
  })

  // limpio el formulario y le quito los colores verdes y rojos
  formulario.reset()
  limpiarColores()
  pintarMensajes()
})

// cuando le picas a limpiar tambien quito los colores
document.querySelector("#limpiar").addEventListener("click", function () {
  limpiarColores()
})

function limpiarColores() {
  yaIntento = false
  campos.forEach(function (campo) {
    campo.classList.remove("is-valid")
    campo.classList.remove("is-invalid")
  })
  errorTerminado.classList.remove("mostrar-error")
  contadorLetras.innerHTML = "0 / 300"
}

// pinta en la pagina todos los mensajes guardados
// el createElement crea una etiqueta nueva desde js y el appendChild la mete adentro de la lista
function pintarMensajes() {
  var guardados = JSON.parse(localStorage.getItem("mensajesGTA")) || []
  listaMensajes.innerHTML = ""

  if (guardados.length == 0) {
    vacio.classList.remove("d-none")
  } else {
    // d-none es la clase de bootstrap pa esconder algo
    vacio.classList.add("d-none")
  }

  // los recorro al reves pa que el mas nuevo salga hasta arriba
  for (var i = guardados.length - 1; i >= 0; i--) {
    var tarjeta = document.createElement("article")
    tarjeta.classList.add("mensaje-guardado")

    var titulo = document.createElement("p")
    titulo.classList.add("mensaje-nombre")
    titulo.textContent = guardados[i].nombre + " · fan de " + guardados[i].personaje

    var texto = document.createElement("p")
    texto.classList.add("mensaje-texto")
    // uso textContent y no innerHTML pa que si alguien escribe etiquetas no se metan a la pagina
    texto.textContent = guardados[i].mensaje

    var datos = document.createElement("p")
    datos.classList.add("mensaje-datos")
    datos.textContent = "Le gustó: " + guardados[i].seccion + " · ¿Lo terminó?: " + guardados[i].terminado + " · " + guardados[i].fecha

    tarjeta.appendChild(titulo)
    tarjeta.appendChild(texto)
    tarjeta.appendChild(datos)
    listaMensajes.appendChild(tarjeta)
  }
}

// el boton de borrar pregunta primero con una ventanita de sweetalert si de verdad quieres borrar
document.querySelector("#borrar").addEventListener("click", function () {
  Swal.fire({
    title: "¿Borrar todos los mensajes?",
    text: "Ya no los vas a poder recuperar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, bórralos",
    cancelButtonText: "Mejor no",
    confirmButtonColor: "#c0392b",
    cancelButtonColor: "#6b685e"
  }).then(function (respuesta) {
    // el .then espera a que le piques a un boton de la ventanita, isConfirmed es true si le diste a que si
    if (respuesta.isConfirmed) {
      localStorage.removeItem("mensajesGTA")
      pintarMensajes()
    }
  })
})

// al abrir la pagina pinto los que ya habia
pintarMensajes()
