// aqui guardo cual estacion esta sonando, si es 0 es que la radio esta apagada
var sintonizada = 0

// los codigos de los videos de youtube, es lo que sale despues del v= en el link del video
// el primero esta vacio a proposito pa que la estacion 1 sea videos[1] y no videos[0]
var videos = ["", "xhXAJD_Q8uU", "Fjp0wu3lEHk", "C3_FSXZtRe8", "z0Wf3IuZnf0", "HHG44PJ0oyo", "HeLsaX1I5B4", "xTpsoTmhdNc", "3P-ux63rHkU"]

// primero le quito el borde verde a las 8 estaciones y luego se lo pongo nomas a la que le picaste
// aqui si use un for porque escribir 8 veces lo mismo ya era mucho xd
// el i va de 1 a 8 y lo pego con "estacion" pa sacar el id (estacion1, estacion2...)
function sintonizar(numero, nombre) {
  for (var i = 1; i <= 8; i++) {
    // el "" vacio le quita el color que le puse con js y regresa al del css, asi el hover sigue jalando
    document.getElementById("estacion" + i).style.borderColor = ""
  }

  // antes de cambiar de estacion apago la que estaba sonando, si le quito el src al video deja de sonar
  document.getElementById("youtube").src = ""
  document.getElementById("reproductor").style.display = "none"

  // si le picas a la que ya esta sonando se apaga la radio
  if (sintonizada == numero) {
    document.getElementById("radio").innerHTML = "📻 Pícale a una estación pa sintonizarla"
    document.getElementById("radio").className = "pista"
    sintonizada = 0
  } else {
    document.getElementById("estacion" + numero).style.borderColor = "#2e8b3a"
    // el innerHTML deja meter etiquetas, las 3 rayitas son las barritas que brincan (la animacion esta en el css)
    document.getElementById("radio").innerHTML = "<span class='barra b1'></span><span class='barra b2'></span><span class='barra b3'></span> Sintonizando: " + nombre
    document.getElementById("radio").className = "pista sonando"
    sintonizada = numero

    // primero suena la estatica como cuando le mueves a la radio del carro
    // el currentTime = 0 la regresa al principio por si ya habia sonado antes
    document.getElementById("estatica").currentTime = 0
    document.getElementById("estatica").play()
    // y medio segundo despues ya prende la estacion
    setTimeout("prenderMusica()", 500)
  }
}

// reviso que sintonizada no sea 0 por si apagaste la radio antes de que pasara el medio segundo
function prenderMusica() {
  if (sintonizada != 0) {
    // como en el juego, la radio no empieza desde el principio sino en cualquier parte
    // el Math.random da un numero entre 0 y 1, por 1800 da hasta 30 minutos, y el floor le quita los decimales
    var segundo = Math.floor(Math.random() * 1800)
    // el autoplay=1 es pa que empiece a sonar solito y el start es en que segundo empieza
    document.getElementById("youtube").src = "https://www.youtube.com/embed/" + videos[sintonizada] + "?autoplay=1&start=" + segundo
    document.getElementById("reproductor").style.display = "block"
  }
}
