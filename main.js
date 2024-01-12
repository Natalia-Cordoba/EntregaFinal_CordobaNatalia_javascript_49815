// //pedir nombre al jugador
let nombre
let respuestaJugador = ""
let partida

//clase PartidaInicial con las condiciones en las cuales inicia la partida nuestro jugador 
class PartidaInicial {
    constructor(nombre) {
        this.nombre = nombre;
        this.respuestasCorrectas = 0;
        this.respuestasIncorrectas = 0;
    }
}


//clase pregunta para construir el cuestionario del quiz
class Pregunta {
    constructor(consigna, opcion1, opcion2, opcion3, opcionCorrecta) {
        this.consigna = consigna;
        this.opcion1 = opcion1;
        this.opcion2 = opcion2;
        this.opcion3 = opcion3;
        this.opcionCorrecta = opcionCorrecta;
    }
}


//crear las preguntas del juego utilizando la clase pregunta y las guardo en un array
let preguntas = [
    new Pregunta ("¿Cuántas Casas hay en Hogwarts?", "TRES", "CUATRO", "CINCO", "2"),
    new Pregunta ("¿Cuál es el verdadero nombre de Voldemort?", "TOM RIDDLE", "RON RIDDLE", "BOB RIDDLE", "1"),
    new Pregunta ("¿Cuál de las siguientes opciones NO es una reliquia de la muerte?", "VARITA DE SAUCO", "CAPA DE INVISIBILIDAD", "CALIZ DE FUEGO", "3"),
    new Pregunta ("¿Cúal es el nombre el profesor Snape?", "ALBUS", "SEVERUS", "RUBEUS", "2"),
    new Pregunta ("¿Qué animal tiene como mascota de Hermione?", "LECHUZA", "RATA", "GATO", "3"),
    new Pregunta ("¿Cómo se llama la serpiente de Voldemort?", "NAGINI", "HEDWIG", "DOBBY", "1"),
    new Pregunta ("¿Con qué prenda de ropa logra ser libre Dobby?", "GUANTE", "GORRO", "MEDIA", "3"),
    new Pregunta ("¿Quién es el creador de la piedra filosofal?", "SIRIUS BLACK", "NICHOLAS FLAMEL", "ALBUS DUMBLEDORE", "2"),
    new Pregunta ("¿Qué hay que recitar para ocultar el contenido del mapa del merodeador?", "TRAVESURA REALIZADA", "TRAVESURA OCULTA", "TRAVESURA CAMUFLADA", "1"),
    new Pregunta ("¿Cuántos horrocruxes tiene que destruir Harry Potter?", "SEIS", "SIETE", "OCHO", "2"),
]


//tomo del html mi card container
let cardContainer = document.querySelector('#preguntasContainer')

function renderizarPreguntas(array, contenedor) {

    // realizo un clon de la plantilla con los datos de cada pregunta
    array.forEach( (pregunta) => {
        clon = document.querySelector('.cardTemplate').content.cloneNode(true)
        
        //cambiar pregunta
        clon.querySelector('h5').innerText = `${pregunta.consigna}`
        // cambiar opcion 1
        clon.querySelector('#opcion1').innerText = `1) ${pregunta.opcion1}`
            // cambiar opcion 2
        clon.querySelector('#opcion2').innerText = `2) ${pregunta.opcion2}`
            // cambiar opcion 3
        clon.querySelector('#opcion3').innerText = `3) ${pregunta.opcion3}`

        contenedor.appendChild(clon)
    })

}

//array que va a contener las preguntas aleatorias de la partida
let preguntasAleatorias = [];


//funcion para seleccionar de manera aleatoria las preguntas
function eleccionPreguntas(preguntas, cantidad) {

    while (preguntasAleatorias.length < cantidad && preguntas.length > 0) {
        let elementoAleatorio = Math.floor(Math.random() * preguntas.length)
        let ordenAleatorio = preguntas.splice(elementoAleatorio, 1)[0]
        preguntasAleatorias.push(ordenAleatorio);
    }

    return preguntasAleatorias
}


//seccion del codigo para realizar el login, guardar nombre de usuario en una variable y comenzar el juego
function login() {
    //oculto el boton terminar
    let botonTerminar = document.querySelector('#terminar')
    botonTerminar.style.display ="none"

    //oculto el boton mostrar resultados
    let botonMostrarResultados = document.querySelector('#mostrarResultados')
    botonMostrarResultados.style.display ="none"

    //oculto la seccion resultados
    let seccionResultado = document.querySelector('#resultados')
    seccionResultado.style.display ="none"

    //escucho eventos
    let botonGuardarNombre = document.querySelector('#guardarNombre')
    botonGuardarNombre.addEventListener('click', guardarNombre) 

    let botonComenzar = document.querySelector('#comenzarJuego')
    botonComenzar.addEventListener('click', iniciarPartida) 
}

function guardarNombre() {
    nombre = document.querySelector('#nombre').value
    localStorage.setItem('nombreJugador', nombre)

} 

login()


//funcion principal de ejecución del juego
function iniciarPartida() {
    partida = new PartidaInicial

    //mensaje sobre como responder correctamente el quiz 
    let mensaje = document.querySelector('.mensaje')

    mensaje.innerText= `⚠ ¡IMPORTANTE! ⚠ 
    Tu respuesta debe ser escrita en NUMEROS. Escribe en el campo de respuesta 1, 2, o 3 segun corresponda... 
    ¡Mucha suerte ${nombre}! 🍀`
    

    // llamo a las funciones que seleccionan preguntas aleatorias y renderizan las cards de preguntas
    eleccionPreguntas(preguntas, 5)
    renderizarPreguntas(preguntasAleatorias, cardContainer)

    //oculto el login 
    let seccionLogin = document.querySelector('#login')
    seccionLogin.style.display ="none"

    //muestro el boton terminar
    let botonTerminar = document.querySelector('#terminar')
    botonTerminar.style.display ="block"
    botonTerminar.addEventListener('click', verificarRespuesta) 

}

function verificarRespuesta() {
    let respuestasElegidas = document.querySelectorAll('.respuesta');

    for (let i = 0; i < preguntasAleatorias.length; i++) {
       
        let respuestaElegida = respuestasElegidas[i];

        if (respuestaElegida) {
            respuestaJugador = respuestaElegida.value

            if(respuestaJugador === preguntasAleatorias[i].opcionCorrecta) {
            partida.respuestasCorrectas ++
            } else {
            partida.respuestasIncorrectas++
            } 
        }
    }
    
    //muestro el boton mostrar resultados
    let botonMostrarResultados = document.querySelector('#mostrarResultados')
    botonMostrarResultados.style.display ="block"
    botonMostrarResultados.addEventListener('click', resultados)
}    

function resultados() {
    //muestro la seccion resultados
    let seccionResultado = document.querySelector('#resultados')
    seccionResultado.style.display ="block"
    //oculto el quiz
    let seccionJuego = document.querySelector('#juego')
    seccionJuego.style.display ="none"

    //guardo en el storage los resultados
    let correctas = partida.respuestasCorrectas
    localStorage.setItem('resCorrectas', correctas)

    let incorrectas = partida.respuestasIncorrectas
    localStorage.setItem('resIncorrectas', incorrectas)

    //muestro los resultados en el html
    let mensajeResultado = document.querySelector('.mensajeResultado')

    mensajeResultado.innerText= `🏆 ¡RESULTADOS! 🏆  
    Jugador: ${nombre}
    Respuestas correctas: ${correctas}
    Respuestas incorrectas: ${incorrectas}
    `

    //escucho un evento
    let botonFinalizar = document.querySelector('#finalizar')
    botonFinalizar.addEventListener('click', finalizarJuego)
}

function finalizarJuego() {
    location.reload()
}
