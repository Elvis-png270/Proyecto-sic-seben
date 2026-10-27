// aqui guardo cual estacion esta sonando, si es 0 es que la radio esta apagada
var sintonizada = 0

// primero le quito el borde verde a las 8 estaciones y luego se lo pongo nomas a la que le picaste
// aqui si use un for porque escribir 8 veces lo mismo ya era mucho xd
// el i va de 1 a 8 y lo pego con "estacion" pa sacar el id (estacion1, estacion2...)
function sintonizar(numero, nombre) {
  for (var i = 1; i <= 8; i++) {
    // el "" vacio le quita el color que le puse con js y regresa al del css, asi el hover sigue jalando
    document.getElementById("estacion" + i).style.borderColor = ""
  }

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
  }
}
