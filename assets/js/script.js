    //los comentarios que deje encima de algunas cosas son los que me ayudaron a entender mejor el funcionamiento de los generadores y el porque de cada cosa, para asi volver a leer el codigo mas adelante y entenderlo mas facil
    
    
    const [primeraCaja, segundaCaja, tercerCaja, contenedorCajasPrimero, contenedorCajasSegundo, contenedorCajasTercero] = ['primeraCaja', 'segundaCaja', 'tercerCaja', 'contenedorCajasPrimero', 'contenedorCajasSegundo', 'contenedorCajasTercero'].map(id => document.getElementById(id));

   
    // Variable global para almacenar los datos obtenidos de la API
    let datos;

    // Esta línea define una función generadora llamada personajeGenerator
    // Una función generadora es como una fábrica que produce personajes uno por uno
    //min y max son los indices de los personajes que se van a mostrar en cada caja
    //el generador se queda esperando aquí hasta que se llame .next()
    function* personajeGenerator(min, max) {
        console.log(`Creando generador para rango ${min}-${max}`);
        for (let i = min; i <= max; i++) {
            if (datos && datos.results && i < datos.results.length) {
                yield datos.results[i];
            } else {
                console.log(`No hay personaje disponible para índice ${i}`);
                return;
            }
        }
        console.log(`Generador para rango ${min}-${max} ha terminado`);
    }

    // Variable global para almacenar la instancia del generador 
    let generadorPersonajes1;
    let generadorPersonajes2;
    let generadorPersonajes3;

    // Función asíncrona para obtener los datos de la API
    async function fetchData() {
        try {
            const response = await fetch("https://swapi.dev/api/people/");
            datos = await response.json();
            console.log("Datos cargados correctamente:", datos);
            console.log("cantidad de resultados",datos.results.length);


            //en particular esta api tiene los personajes divididos en paginas de 10 en 10
            //si hay menos de 11 personajes, se carga la siguiente pagina
            if (datos.results.length < 11) {
                console.log("Cargando página adicional para asegurar suficientes personajes");
                const response2 = await fetch("https://swapi.dev/api/people/?page=2");
                const datos2 = await response2.json();
                //concatena los resultados de la segunda pagina con los de la primera
                datos.results = datos.results.concat(datos2.results);
            }
            //console log para ver cuantos personajes hay en total dentro de datos.results
            console.log("Total de personajes cargados:", datos.results.length);


            //se crean los generadores para cada caja
            //estos generadores se quedan esperando a que se llame a .next() para mostrar el siguiente personaje en esos rangos de personajes
            generadorPersonajes1 = personajeGenerator(0, 4);
            generadorPersonajes2 = personajeGenerator(5, 9);
            generadorPersonajes3 = personajeGenerator(11, 15);  // Ajustado para incluir hasta el personaje 16


            console.log("Generadores creados");
            
            agregarEventoMouseover();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }

    // Inicia el proceso de obtención de datos es decir ya estan los generadores para los tres rangos creados
    fetchData();



    // Esta función prepara los eventos para mostrar nuevos personajes cuando el mouse sale de cada caja
    function agregarEventoMouseover() {
        if (primeraCaja && contenedorCajasPrimero) {
            primeraCaja.addEventListener("mouseleave", () => mostrarSiguientePersonaje(generadorPersonajes1, contenedorCajasPrimero, primeraCaja));
            console.log("Evento agregado a primeraCaja");
        } else {
            console.error("No se encontró primeraCaja o contenedorCajasPrimero");
        }
        if (segundaCaja && contenedorCajasSegundo) {
            segundaCaja.addEventListener("mouseleave", () => mostrarSiguientePersonaje(generadorPersonajes2, contenedorCajasSegundo, segundaCaja));
            console.log("Evento agregado a segundaCaja");
        } else {
            console.error("No se encontró segundaCaja o contenedorCajasSegundo");
        }
        if (tercerCaja && contenedorCajasTercero) {
            tercerCaja.addEventListener("mouseleave", () => mostrarSiguientePersonaje(generadorPersonajes3, contenedorCajasTercero, tercerCaja));
            console.log("Evento agregado a tercerCaja");
        } else {
            console.error("No se encontró tercerCaja o contenedorCajasTercero");
        }
        console.log("Eventos agregados a las cajas");
    }

    //esta funcion cada vez que se ejecuta muestra el siguiente personaje disponible en el generador
    //sera llamada por el evento mouseleave de cada caja creado en la funcion agregarEventoMouseover    

    //lo muestra traves de la creacion de una nueva tarjeta de personaje

    //generador es el generador de personajes, contenedor es el contenedor de la caja, caja es la caja en si    
    function mostrarSiguientePersonaje(generador, contenedor, caja) {
        console.log(`Intentando mostrar siguiente personaje para: ${caja.id}`);
        const resultado = generador.next();
        
        // Si el generador no ha terminado (aún hay personajes disponibles)
        if (!resultado.done) { // Sí, .done funciona con yields en generadores

            // Obtiene los datos del siguiente personaje
            const personajeData = resultado.value;
            // Registra en la consola el nombre del personaje obtenido y para qué caja es
            console.log(`Personaje obtenido para ${caja.id}:`, personajeData.name);
            // Crea una nueva instancia de la clase Personaje con los datos obtenidos
            const personaje = new Personaje(personajeData.name, personajeData.height, personajeData.mass, personajeData.url);
            // Añade la tarjeta del personaje al contenedor correspondiente
            contenedor.appendChild(personaje.crearTarjeta());
        } else {
            //si el generador termino, se elimina el evento de mouseleave
            console.log(`No hay más personajes disponibles para: ${caja.id}`);
            caja.removeEventListener("mouseleave", () => mostrarSiguientePersonaje(generador, contenedor, caja));
        }
    }

   

    // Clase para crear personaje y su tarjeta con la imagen y los datos
    class Personaje {
        constructor(nombre, altura, peso, url) {
            this.nombre = nombre;
            this.altura = altura;
            this.peso = peso;
            this.id = this.extraerIdDeUrl(url);
        }

        // Esta función extrae el ID del personaje de la URL
        // Funciona de la siguiente manera:
        // 1. Divide la URL en partes usando '/' como separador
        // 2. Devuelve la penúltima parte, que es el ID del personaje
        // Por ejemplo, de 'https://swapi.dev/api/people/1/', devuelve '1'
        extraerIdDeUrl(url) {
            const partes = url.split('/');
            console.log(partes);
            console.log(partes.length);
            console.log(partes[partes.length - 2]);
            return partes[partes.length - 2];
        }

        crearTarjeta() {
            const div = document.createElement('div');
            div.className = 'flex flex-row bg-gray-800 bg-opacity-50 w-[30%] h-[150px] text-blue-300 p-4 m-2 rounded-lg shadow-lg border border-blue-400 hover:border-blue-300 transition-all duration-300 animate-hologram hologram-effect';
            //la imagen se obtiene de la api de star wars visual guide
            const imagenUrl = `https://starwars-visualguide.com/assets/img/characters/${this.id}.jpg`;
            div.innerHTML = `
                <div class="mr-4"><img src="${imagenUrl}" alt="${this.nombre}" class="rounded-lg w-[100px] h-[100px] object-cover border border-yellow-500"></div>
                <div class="flex flex-col justify-center">
                    <h3 class="text-lg font-bold mb-2 text-blue-300">${this.nombre}</h3>
                    <p class="text-sm">Altura: ${this.altura}cm</p>
                    <p class="text-sm">Peso: ${this.peso}kg</p>
                </div>
            `;
            return div;
        }
    }

