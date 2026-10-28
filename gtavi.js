// la fecha en que sale gta vi, OJO el mes empieza en 0 (enero es 0) por eso noviembre es 10 y no 11
// me tarde un buen en darme cuenta de eso alv
var salida = new Date(2026, 10, 19, 0, 0, 0)

// el setInterval es como el setTimeout pero se repite pa siempre, aqui cada 1000 milisegundos (1 segundo)
function iniciar() {
  contar()
  setInterval("contar()", 1000)
}

function contar() {
  var ahora = new Date()
  // si restas dos fechas te da los milisegundos que hay entre ellas
  var falta = salida - ahora

  // si ya paso la fecha ya no cuento nada
  if (falta <= 0) {
    document.getElementById("cuenta").innerHTML = "<p class='salio'>¡GTA VI ya salió! 🎉</p>"
    return
  }

  // un dia tiene 1000 * 60 * 60 * 24 milisegundos, el floor le quita los decimales
  // el % es lo que sobra de dividir, asi las horas no pasan de 23, los minutos de 59, etc
  var dias = Math.floor(falta / (1000 * 60 * 60 * 24))
  var horas = Math.floor(falta / (1000 * 60 * 60)) % 24
  var minutos = Math.floor(falta / (1000 * 60)) % 60
  var segundos = Math.floor(falta / 1000) % 60

  // le pongo un 0 adelante si es de un solo numero pa que se vea 05 y no 5
  if (horas < 10) {
    horas = "0" + horas
  }
  if (minutos < 10) {
    minutos = "0" + minutos
  }
  if (segundos < 10) {
    segundos = "0" + segundos
  }

  document.getElementById("dias").innerHTML = dias
  document.getElementById("horas").innerHTML = horas
  document.getElementById("minutos").innerHTML = minutos
  document.getElementById("segundos").innerHTML = segundos
}
