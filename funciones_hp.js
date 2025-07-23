const apiUrl = "https://hp-api.onrender.com/api/characters";
const form = document.getElementById("busquedaForm");
const input = document.getElementById("buscar");
const container = document.getElementById("personajes");
let allCharacters = [];

// Función para renderizar personajes
function renderCharacters(characters) {
    container.innerHTML = "";

    if (characters.length === 0) {
        container.innerHTML = "<p>No se encontraron personajes.</p>";
        return;
    }

    characters.forEach(char => {
        const div = document.createElement("div");
        div.className = "character";
        div.innerHTML = `
    <strong>
        <a href="https://harrypotter.fandom.com/wiki/${encodeURIComponent(char.name)}" target="_blank">
            ${char.name}
        </a>
    </strong><br>
    ${char.image ? `<img src="${char.image}" alt="${char.name}">` : ""}
`;

        container.appendChild(div);
    });
}

// Obtener todos los personajes al cargar
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        allCharacters = data;
        renderCharacters(allCharacters);
    })
    .catch(err => {
        container.innerHTML = "<p>Error al cargar los personajes.</p>";
        console.error(err);
    });

// Manejar búsqueda
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    const filtrados = allCharacters.filter(c => c.name.toLowerCase().includes(query));
    renderCharacters(filtrados);
});
