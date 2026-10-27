// aqui guardo cual tarjeta esta seleccionada, si es 0 es que ninguna
var seleccionada = 0

// el setTimeout se espera los milisegundos que le pongas y luego corre lo que esta en comillas
// le puse 0, 100 y 200 y 300 pa que salgan una por una bien bonito y no todas de madrazo
function iniciar() {
  setTimeout("aparecer(1)", 0)
  setTimeout("aparecer(2)", 100)
  setTimeout("aparecer(3)", 200)
  setTimeout("aparecer(4)", 300)
  // por si la pantalla es bien grande y los secundarios ya se ven desde el principio
  setTimeout("revisarScroll()", 400)
}

// el getBoundingClientRect().top (nombre bien largo alv) te dice que tan lejos esta la
// tarjeta de lo de arriba de la pantalla
// y el window.innerHeight es lo alto de la pantalla entonces si top es menor quiere decir que ya se ve
function aparecer(numero) {
  if (document.getElementById("tarjeta" + numero).getBoundingClientRect().top < window.innerHeight) {
    if (document.getElementById("tarjeta" + numero).className == "tarjeta") {
      // nomas le cambio la clase y el css hace la animacion solito, n0 le tuve que mover
      document.getElementById("tarjeta" + numero).className = "tarjeta visible"
    }
  }
}

// esta se corre cada que le haces scroll y revisa las 4 tarjetas a ver si ya se ven
function revisarScroll() {
  aparecer(1)
  aparecer(2)
  aparecer(3)
  aparecer(4)

  // lo mismo pero con la seccion de los secundarios, le resto 100 pa que salga ya que se ve un poquito mas
  if (document.getElementById("secundarios").getBoundingClientRect().top < window.innerHeight - 100) {
    document.getElementById("secundarios").className = "secundarios mostrar"
  }

  // el window.scrollY es cuanto has bajado en la pagina, si ya bajaste mas de 500 sale el boton de subir
  if (window.scrollY > 500) {
    document.getElementById("subir").style.opacity = "1"
    document.getElementById("subir").style.visibility = "visible"
  } else {
    document.getElementById("subir").style.opacity = "0"
    document.getElementById("subir").style.visibility = "hidden"
  }
}

// primero le quito el borde verde a todas y luego se lo pongo nomas a la que le picaste, asi no quedan dos verdes
// y si le vuelves a picar a la misma se le quita ya se que se repite mucho el codigo pero asi si me salio xd
// y ahora tambien prende la ficha de abajo, con las fichas es lo mismo: primero las apago todas y luego prendo la que toca
function seleccionar(numero) {
  if (seleccionada == numero) {
    document.getElementById("tarjeta1").className = "tarjeta visible"
    document.getElementById("tarjeta2").className = "tarjeta visible"
    document.getElementById("tarjeta3").className = "tarjeta visible"
    document.getElementById("tarjeta4").className = "tarjeta visible"
    document.getElementById("ficha1").style.display = "none"
    document.getElementById("ficha2").style.display = "none"
    document.getElementById("ficha3").style.display = "none"
    document.getElementById("ficha4").style.display = "none"
    // si ya no hay ninguna escogida vuelvo a enseñar el mensajito
    document.getElementById("pista").style.display = "block"
    seleccionada = 0
  } else {
    document.getElementById("tarjeta1").className = "tarjeta visible"
    document.getElementById("tarjeta2").className = "tarjeta visible"
    document.getElementById("tarjeta3").className = "tarjeta visible"
    document.getElementById("tarjeta4").className = "tarjeta visible"
    document.getElementById("tarjeta" + numero).className = "tarjeta visible activa"
    document.getElementById("ficha1").style.display = "none"
    document.getElementById("ficha2").style.display = "none"
    document.getElementById("ficha3").style.display = "none"
    document.getElementById("ficha4").style.display = "none"
    document.getElementById("ficha" + numero).style.display = "block"
    document.getElementById("pista").style.display = "none"
    // esto baja la pagina despacito hasta la ficha, el nearest es pa que solo se mueva lo necesario y no brinque todo
    document.getElementById("ficha" + numero).scrollIntoView({ behavior: "smooth", block: "nearest" })
    seleccionada = numero
  }
}

// el boton de subir, te regresa hasta arriba (top 0) pero despacito por el smooth
function subir() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
