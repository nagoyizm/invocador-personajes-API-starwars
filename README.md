# Star Wars Character Dimensions

Este proyecto es una página web interactiva que muestra las dimensiones de los personajes de **Star Wars**. Utiliza **Tailwind CSS** para el diseño y estilos, y consume la API pública de Star Wars (SWAPI) para obtener los datos de los personajes. Cada sección de la página contiene tarjetas que presentan diferentes personajes, y al hacer clic en cada tarjeta, se muestra el siguiente personaje disponible en ese rango.

## Tecnologías Utilizadas

- **HTML5**: Estructura de la página.
- **Tailwind CSS**: Para el diseño y estilos a través de CDN.
- **Google Fonts**: Se utilizan las fuentes `Poppins` y `Pathway Gothic One`.
- **JavaScript ES6**: Para la lógica de la página, incluyendo generadores y clases.
- **API SWAPI**: API para obtener los personajes de Star Wars.
- **Star Wars Visual Guide**: API para obtener imágenes de los personajes.

## Funcionalidades

- **Interfaz visual interactiva**: Cada sección de la página muestra tarjetas con personajes. Al hacer clic en una tarjeta, se carga el siguiente personaje disponible en el generador.
- **Generadores de personajes**: Se utilizan funciones generadoras (`personajeGenerator`) para obtener personajes en rangos definidos.
- **Petición de API**: Se hace una solicitud a la API de SWAPI para obtener los personajes y sus detalles (nombre, altura, peso).
- **Imágenes dinámicas**: Las imágenes de los personajes se obtienen a través de la **Star Wars Visual Guide**.

## Estructura del Proyecto

El proyecto contiene los siguientes archivos clave:

- `index.html`: El archivo principal que estructura la página y carga el contenido visual.
- `assets/css/styles.css`: Archivo CSS donde se define la personalización de los estilos.
- `assets/js/script.js`: Contiene la lógica JavaScript, incluyendo la interacción con la API y el manejo de eventos.
- `assets/img/fondo.jpg`: Imagen de fondo usada en la página.

## Instrucciones de Uso

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu_usuario/star-wars-dimensions.git
    cd star-wars-dimensions
    ```

2. **Abrir el proyecto**: Simplemente abre el archivo `index.html` en tu navegador para ver la página.

3. **Interacción**: Al hacer clic en las tarjetas de personajes, se cargarán los siguientes personajes disponibles de los rangos establecidos.

## Dependencias

- **Tailwind CSS**: Se incluye a través de un CDN en el `<head>` del archivo HTML.
- **Google Fonts**: Las fuentes `Poppins` y `Pathway Gothic One` están incluidas también mediante un enlace en el `<head>`.

## Notas Importantes

- Los personajes se cargan dinámicamente desde la API de Star Wars, por lo que es necesario estar conectado a Internet para ver los datos.
- La API tiene un límite de personajes por página, por lo que se han programado solicitudes adicionales para obtener más de 10 personajes si es necesario.

## Personalización

Puedes modificar los rangos de personajes que se muestran en cada sección editando los parámetros de la función `personajeGenerator()` en el archivo `script.js`:

```javascript
generadorPersonajes1 = personajeGenerator(0, 4);
generadorPersonajes2 = personajeGenerator(5, 9);
generadorPersonajes3 = personajeGenerator(10, 14);  // Ajusta los índices aquí
