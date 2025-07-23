window.onload = pedir_frase_got

function pedir_frase_got() {
    fetch("https://api.gameofthronesquotes.xyz/v1/random")
    .then((response) => response.json())
    .then((data) => {
        const frase = data.sentence;
        const personaje = data.character.name
        document.getElementById("frase_got").textContent = frase
        document.getElementById("personaje_got").textContent = personaje
        imagen_personaje(personaje)
    })
    .catch((error) => console.error("No hay frase", error));
}

function imagen_personaje(personaje) {
    fetch("https://thronesapi.com/api/v2/characters")
        .then((response) => response.json())
        .then((data) => {
            const personajeEncontrado = data.find(p => p.fullName === personaje);

            if (personajeEncontrado) {
                document.getElementById("imagen_personaje").src = personajeEncontrado.imageUrl;
                document.getElementById("texto_personaje").textContent = personajeEncontrado.fullName;
            } else {
                document.getElementById("texto_personaje").textContent = "No se encontró imagen para " + personaje;
                document.getElementById("imagen_personaje").src = "https://img.freepik.com/psd-gratis/renderizado-3d-signo-interrogacion-azul-brillante_191095-80786.jpg?semt=ais_hybrid&w=740";
            }
        })
        .catch((error) => console.error("No hay foto", error));
}