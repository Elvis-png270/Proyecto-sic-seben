// las respuestas buenas de cada pregunta, el primero esta vacio pa que la pregunta 1 sea correctas[1]
var correctas = ["", "b", "c", "a", "a", "b", "c", "a", "b"]

// aqui voy guardando cuales ya contestaste pa que no le puedas picar dos veces a la misma
var contestada = [false, false, false, false, false, false, false, false, false]

var puntos = 0
var llevas = 0

// el localStorage es como una cajita que guarda datos en tu navegador y no se borran aunque cierres la pagina
// el getItem saca lo que guardaste con ese nombre, si nunca has jugado te da null (osea nada)
var mejor = localStorage.getItem("mejorPuntajeQuiz")
if (mejor != null) {
  document.getElementById("mejor").innerHTML = "<i class='fa-solid fa-trophy'></i> Tu mejor puntaje: " + mejor + " / 8"
}

// esta se corre cada que le picas a una opcion, el js recibe el numero de pregunta y la letra que escogiste
function responder(pregunta, letra) {
  // si ya la habias contestado no hago nada, el return se sale de la funcion
  if (contestada[pregunta] == true) {
    return
  }
  contestada[pregunta] = true
  llevas = llevas + 1

  // si la letra es igual a la buena se pinta verde y sumo un punto
  // si no, la que escogiste se pinta roja y la buena verde pa que veas cual era
  if (letra == correctas[pregunta]) {
    document.getElementById("p" + pregunta + letra).className = "opcion bien"
    puntos = puntos + 1
  } else {
    document.getElementById("p" + pregunta + letra).className = "opcion mal"
    document.getElementById("p" + pregunta + correctas[pregunta]).className = "opcion bien"
  }

  document.getElementById("contador").innerHTML = "Llevas " + llevas + " de 8 preguntas"

  // cuando ya contestaste las 8 enseño el resultado
  if (llevas == 8) {
    mostrarResultado()
  }
}

function mostrarResultado() {
  document.getElementById("calificacion").innerHTML = puntos + " / 8"

  // el .value saca lo que escribiste en la cajita del nombre
  // si la dejaste vacia te digo compa pa que no salga nomas una coma
  var nombre = document.getElementById("nombre").value
  if (nombre == "") {
    nombre = "compa"
  }

  // un mensaje distinto segun cuantas sacaste, con tu nombre al principio
  if (puntos == 8) {
    document.getElementById("mensaje").innerHTML = "¡Perfecto, " + nombre + "! Te sabes GTA V de memoria 🏆"
  } else if (puntos >= 5) {
    document.getElementById("mensaje").innerHTML = "Nada mal, " + nombre + ", se nota que sí lo has jugado 🚗"
  } else {
    document.getElementById("mensaje").innerHTML = "Te falta calle, " + nombre + ". Date una vuelta por las otras páginas y vuelve a intentarlo 😅"
  }

  document.getElementById("resultado").style.display = "block"
  // baja la pagina despacito hasta el resultado
  document.getElementById("resultado").scrollIntoView({ behavior: "smooth" })

  // si es la primera vez que juegas o sacaste mas que tu mejor puntaje, lo guardo con setItem
  // el Number() convierte el texto guardado en numero pa poder compararlo
  if (mejor == null || puntos > Number(mejor)) {
    localStorage.setItem("mejorPuntajeQuiz", puntos)
    mejor = puntos
    document.getElementById("mejor").innerHTML = "<i class='fa-solid fa-trophy'></i> Tu mejor puntaje: " + puntos + " / 8"

    // Swal.fire es de la libreria sweetalert2, saca una ventanita bonita en medio de la pantalla
    Swal.fire({
      title: "¡Nuevo récord!",
      text: "Sacaste " + puntos + " de 8, ese es tu mejor puntaje hasta ahora.",
      icon: "success",
      confirmButtonText: "Va",
      confirmButtonColor: "#2e8b3a"
    })
  }
}
