window.onload = mostrarPersonajeAleatorio


const API_URL = "https://starwars-databank-server.vercel.app/api/v1/characters";
const PAGE_LIMIT = 50; // Máximo por página (ajustable)
const TOTAL_CHARACTERS = 952; // Total conocidos por la API

// Función para obtener todos los personajes paginados
async function obtenerTodosLosPersonajes() {
    const totalPages = Math.ceil(TOTAL_CHARACTERS / PAGE_LIMIT);
    let personajes = [];

    const peticiones = [];

    for (let page = 1; page <= totalPages; page++) {
        const url = `${API_URL}?page=${page}&limit=${PAGE_LIMIT}`;
        peticiones.push(fetch(url).then((res) => res.json()));
    }

    const resultados = await Promise.all(peticiones);
    resultados.forEach(result => {
        if (result.data) {
            personajes = personajes.concat(result.data);
        }
    });

    return personajes;
}

// Función para mostrar un personaje aleatorio
async function mostrarPersonajeAleatorio() {
    try {
        const personajes = await obtenerTodosLosPersonajes();
        const randomIndex = Math.floor(Math.random() * personajes.length);
        const personaje = personajes[randomIndex];

        document.getElementById("personaje_starwars").textContent = personaje.name || "Desconocido";
        document.getElementById("imagen_personaje").src = personaje.image || "";
        document.getElementById("imagen_personaje").alt = personaje.name || "Personaje de Star Wars";
        document.getElementById("descripcion").textContent = personaje.description;
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        document.getElementById("personaje_starwars").textContent = "Error al cargar personaje.";
    }
}

