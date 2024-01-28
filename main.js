// //variable globales
let partida
let preguntasAleatorias = [];
let indicePreguntaActual = 0;
let numeroPregunta = 1
let preguntaActual


//clase PartidaInicial con las condiciones en las cuales inicia la partida nuestro jugador 
class PartidaInicial {
    constructor(nombre) {
        this.nombre = nombre;
        this.respuestasCorrectas = 0;
        this.respuestasIncorrectas = 0;
    }
}

//funcion para realizar el login, guardar nombre de usuario en una variable y dar la bienvenida 
function login() {
    //escucho el evento del boton guardar
    let botonGuardarNombre = document.querySelector('#guardarNombre');

    botonGuardarNombre.addEventListener('click', () => {

        //me quedo con el valor de nombre para reutilizarlo
        let nombre = document.querySelector('#nombre').value;

        partida = new PartidaInicial(nombre)

        localStorage.setItem('nombreJugador', nombre);
        document.querySelector('#nombre').value = "";

        //le doy la bienvenida al jugador
        return (
            Swal.fire({
                title: `Hola ${nombre}!`,
                width: 500,
                text: 'Vas a jugar un quiz de cine, series, libros y juegos',
                confirmButtonText: 'OK',
                imageUrl: "https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "welcome"
            }),
            //oculto las secciones que no necesito 
            document.querySelector('#login').classList.add('oculta'),
            document.querySelector('#juego').classList.remove('oculta')
        )
    })

    //escucho el evento del boton comenzar
    let botonComenzar = document.querySelector('#comenzarJuego')
    botonComenzar.addEventListener('click', () => {
        document.querySelector('#preguntasContainer').classList.remove('oculta')
        mostrarPregunta(partida.nombre);
    })
}

login()


// Función para seleccionar de manera aleatoria las preguntas
function eleccionPreguntas(preguntas, cantidad) {
    let preguntasSelecionadas = [];

    while (preguntasSelecionadas.length < cantidad && preguntas.length > 0) {
        let elementoAleatorio = Math.floor(Math.random() * preguntas.length);
        let preguntaAleatoria = preguntas.splice(elementoAleatorio, 1)[0];
        preguntasSelecionadas.push(preguntaAleatoria);
    }

    return preguntasSelecionadas;
}


// Uso fetch para traer la data desde preguntas.json
fetch('./preguntas.json')
    .then(response => response.json())
    .then(data => {
        // Itero sobre las categorías del array PreguntasAleatorias, con la funcion eleccionPreguntas seleciono una de cada categoria de manera aleatoria y las concateno
        for (let i = 0; i < data.length; i++) {
            preguntasAleatorias = preguntasAleatorias.concat(eleccionPreguntas(data[i].preguntas, 1));
        }
    });


// Tomo del HTML mi card container
let cardContainer = document.querySelector('#preguntasContainer');


// renderizo las preguntasAleatorias creando un clon de mi etiqueta template, van a mostrarse una a una
function renderizarPregunta(pregunta, contenedor) {

    // Realizo un clon de la plantilla oculta con templete con los datos de cada pregunta
    let clon = document.querySelector('.cardTemplate').content.cloneNode(true);

    //cambio el numero de pregunta 
    clon.querySelector('#numeroPregunta').innerText = numeroPregunta++

    // Cambio la pregunta
    clon.querySelector('h5').innerText = `${pregunta.pregunta}`;
    // Cambio las opciones
    clon.querySelector('#opcion1').innerText = `${pregunta.opcion1}`;
    clon.querySelector('#opcion2').innerText = `${pregunta.opcion2}`;
    clon.querySelector('#opcion3').innerText = `${pregunta.opcion3}`;

    contenedor.appendChild(clon);

    return clon;
}


//funcion para mostrar en el html la pregunta actual 
function mostrarPregunta() {

    //oculto el boton comenzar
    document.querySelector('#comenzarJuego').classList.add('oculta')

    // muestro la pregunta actual de mi array de preguntas aleatorias
    if (indicePreguntaActual < preguntasAleatorias.length) {
        preguntaActual = preguntasAleatorias[indicePreguntaActual++];
        renderizarPregunta(preguntaActual, cardContainer);

        // Escucho el evento click en las opciones de preguntas
        opciones = document.querySelectorAll('.opciones');
        opciones.forEach(opcion => {
            opcion.addEventListener('click', verificarRespuesta);
        });
    }
    else {
        //le doy un mensaje antes de mostrar los resultados
        Swal.fire({
            title: `Finalizaste el quiz ${partida.nombre}!`,
            width: 500,
            text: 'Vamos a averiguar que tan friki eres',
            confirmButtonText: 'OK',
        }),

            resultados()
    }
}

// funcion para verificar si las respuestas del jugador son correctas o no, y para llamar a la pregunta siguiente
function verificarRespuesta() {

    // Obtengo el texto de la opción seleccionada por el jugador
    let respuestaSeleccionada = this.textContent;

    // Recorrer nuevamente las opciones para aplicar clases que daran luego estilos
    opciones.forEach(opcion => {
        if (opcion.textContent === preguntaActual.opcionCorrecta) {
            // Si la opción es la correcta, agrego la class correcta
            opcion.classList.add('correcta');
        } else if (opcion.textContent === respuestaSeleccionada) {
            // Si la opción es la seleccionada por el usuario y nmo es la correcta, agrego la class incorrecta
            opcion.classList.add('incorrecta');
        }
    });

    //verifico si coincide con la propiedad opcionCorrecta de la preguntaActual
    if (respuestaSeleccionada === preguntaActual.opcionCorrecta) {
        //aumento cantidad de resp correctas
        partida.respuestasCorrectas++
        //muestro los puntos sumados
        Toastify({
            text: "+ 100 pts",
            duration: 2000,
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    } else {
        //aumento cantidad de resp incorrectas
        partida.respuestasIncorrectas++
        //muestro los puntos sumados
        Toastify({
            text: "+ 0 pts",
            duration: 2000,
            position: "center",
            style: {
                background: "linear-gradient(to right, #f81818, #f8cc0a)",
            }
        }).showToast();
    }

    // Espero un momento antes de ocultar la pregunta actual para que pueda aplicar los estilos
    setTimeout(() => {
        // Después de aplicar los estilos, oculto la pregunta actual
        this.closest('.card-body').classList.add('oculta');

        // Muestro la siguiente pregunta
        mostrarPregunta();
    }, 1000);
}

//funcion para calcular los resultados de la partida 
function resultados() {

    //oculto las secciones que no necesito
    document.querySelector('#juego').classList.add('oculta');

    // Espero un momento antes de mostrar la tabla de posiciones para que pueda leer el mesaje
    setTimeout(() => {
        // muestro los resultados
        document.querySelector('#resultados').classList.remove('oculta')
    }, 3000);

    //guardo en el storage los resultados
    //cantidad de respuestas correctas
    let correctas = partida.respuestasCorrectas
    localStorage.setItem('respCorrectas', correctas)

    //cantidad de respuestas incorrectas
    let incorrectas = partida.respuestasIncorrectas
    localStorage.setItem('respIncorrectas', incorrectas)

    //puntaje total de la partida
    let puntajeFinal = correctas * 100
    localStorage.setItem('puntos', puntajeFinal)

    //llamo a la funcion que muestra los resultados en el html
    agregarJugador(partida.nombre, puntajeFinal)

    //escucho el evento finalizar que reinicia el juego
    let botonFinalizar = document.querySelector('#finalizar')
    botonFinalizar.addEventListener('click', () => {
        location.reload()
    })
}

//funcion para agregar en el html los resultados de la partida en una tabla de posiciones  
function agregarJugador(nombre, puntaje) {
    // tomo del html la tabla de posiciones
    let tabla = document.querySelector('table tbody');

    // Crea una nueva fila con sus celdas
    let nuevaFila = tabla.insertRow();
    let celda1 = nuevaFila.insertCell(0);
    let celda2 = nuevaFila.insertCell(1);
    let celda3 = nuevaFila.insertCell(2);

    // Incremento automáticamente el puesto basado en el número actual de filas
    celda1.textContent = `🏅${tabla.rows.length}`;

    // Agrego el contenido a las celdas
    celda2.textContent = nombre;
    celda3.textContent = puntaje;

    // Ordeno las filas de acuerdo a los puntajes (de mayor a menor)
    let filas = Array.from(tabla.rows).slice(1); // Ignoro la primera fila
    filas.sort((filaA, filaB) => {
        let puntajeA = parseInt(filaA.cells[2].textContent);
        let puntajeB = parseInt(filaB.cells[2].textContent);
        return puntajeB - puntajeA;
    });

    // Elimino todas las filas de la tabla
    filas.forEach(fila => tabla.removeChild(fila));

    // Vuelve a agregar las filas ordenadas y 
    filas.forEach(fila => tabla.appendChild(fila));
}
