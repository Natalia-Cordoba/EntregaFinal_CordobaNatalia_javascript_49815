//pedir nombre al jugador y dar la bienvenida/despedida
let nombre = prompt("Por favor, ingresa tu nombre")
let respuestaJugador = ""

function saludar(saludo) {
    if (saludo == 'hola') {
        alert('Hola ' + nombre + ' ¿Comenzamos a jugar?')
    } else if (saludo == 'adios') {
        alert('Adios ' + nombre + ' ¡Gracias por jugar!')
    }
}
saludar('hola');


//clase pregunta para construir el cuestionario del quiz
class Pregunta {
    constructor(consigna, opciones, respuesta, acierto) {
        this.consigna = consigna;
        this.opciones = opciones;
        this.respuesta = respuesta;
        this.acierto = acierto;
    }
}


//crear las preguntas del juego utilizando la clase pregunta y las guardo en un array
let preguntas = [
    new Pregunta ("¿Cuántas Casas hay en Hogwarts? \n 1. TRES  \n 2. CUATRO \n 3. CINCO", [1, 2, 3], 2, true),
    new Pregunta ("¿Cuál es el verdadero nombre de Voldemort? \n 1. TOM RIDDLE \n 2. RON RIDDLE \n 3. BOB RIDDLE", [1 , 2, 3], 1, true),
    new Pregunta ("¿Cuál de las siguientes opciones NO es una reliquia de la muerte? \n 1. VARITA DE SAUCO \n 2. CAPA DE INVISIBILIDAD \n 3. CALIZ DE FUEGO", [1, 2, 3], 3, true),
    new Pregunta ("¿Cúal es el nombre el profesor Snape? \n 1. ALBUS \n 2. SEVERUS \n 3. RUBEUS", [1, 2, 3], 2, true),
    new Pregunta ("¿Qué animal tiene como mascota de Hermione? \n 1. LECHUZA \n 2. RATA \n 3. GATO", [1, 2, 3], 3, true),
    new Pregunta ("¿Cómo se llama la serpiente de Voldemort? \n 1. NAGINI  \n 2. HEDWIG \n 3. DOBBY", [1, 2, 3], 1, true),
    new Pregunta ("¿Con qué prenda de ropa logra ser libre Dobby? \n 1. GUANTE  \n 2. GORRO \n 3. MEDIA", [1, 2, 3], 3, true),
    new Pregunta ("¿Quién es el creador de la piedra filosofal? \n 1. SIRIUS BLACK  \n 2. NICHOLAS FLAMEL \n 3. ALBUS DUMBLEDORE", [1, 2, 3], 2, true),
    new Pregunta ("¿Qué hay que recitar para ocultar el contenido del mapa del merodeador? \n 1. TRAVESURA REALIZADA  \n 2. TRAVESURA OCULTA \n 3. TRAVESURA CAMUFLADA", [1, 2, 3], 1, true),
    new Pregunta ("¿Cuántos horrocruxes tiene que destruir Harry Potter? \n 1. SEIS  \n 2. SIETE \n 3. OCHO", [1, 2, 3], 2, true),
]


//clase Jugador con las condiciones en las cuales inicia la partida nuestro jugador 
class PartidaInicial {
    constructor(nombre) {
        this.nombre = nombre;
        this.respuestasCorrectas = 0;
        this.respuestasIncorrectas = 0;
    }
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


//funcion principal de ejecución del juego
function juego() {

    eleccionPreguntas(preguntas, 5)

    //marco cuando inicia el quiz
    let tiempoInicio = Date.now();

    let partida = new PartidaInicial 

    for (let pregunta of preguntasAleatorias) {
        
        respuestaJugador = prompt(pregunta.consigna)

        if (respuestaJugador == pregunta.respuesta) {
            console.log("Respuesta Correcta 👍")
            partida.respuestasCorrectas ++
        } else if (respuestaJugador != pregunta.respuesta) {
            partida.respuestasIncorrectas++
            pregunta.acierto = false
            console.log("Respuesta Incorrecta 👎")
        } 
    }

    //marco cuando termina el quiz 
    let tiempoFin = Date.now();

    //calculo cuanto tiempo tardo en realizar el quiz
    let tiempoTotal = tiempoFin - tiempoInicio

    //mostrar el resultado de la partida
    alert(`${nombre}! Estos son tus resultados:

    El total de preguntas fueron: ${preguntas.length}.
    Respuestas correctas: ${partida.respuestasCorrectas}.
    Respuestas incorrectas: ${partida.respuestasIncorrectas}.
    Tardaste ${tiempoTotal} ms en realizar el quiz.`)

    let acertadas = preguntasAleatorias.filter((pregunta) => pregunta.acierto == true)
    console.log(acertadas)

    let equivocadas = preguntasAleatorias.filter((pregunta) => pregunta.acierto == false)
    console.log(equivocadas)  
}

juego()


//Despedir al jugador cuando decida dejar de jugar
saludar('adios')
