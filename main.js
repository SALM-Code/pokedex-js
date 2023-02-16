// URL base de la API de PokeAPI
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Obtener referencias a los elementos del DOM
const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Función para buscar un Pokémon
async function search() {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const searchQuery = searchInput.value.toLowerCase();

    try {
        // Realizar una petición a la API de PokeAPI con el nombre del Pokémon
        const response = await fetch(apiUrl + searchQuery);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró ningún Pokémon llamado "${searchQuery}"`);
            return;
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Mostrar los datos del Pokémon en el contenedor de resultados
        pokedexContainer.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
        `;
    } catch (error) {
        // Si ocurre algún error durante la petición, mostrar un mensaje de error
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}

// Agregar un controlador de eventos al botón de búsqueda
document.querySelector('button').addEventListener('click', search);