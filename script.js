
let container = document.getElementById("container");
let searchInput = document.getElementById("searchInput");
let filterType = document.getElementById("filterType");
let sortScore = document.getElementById("sortScore");

let allAnime = []; 

async function fetchAnime() {
    try {
        let response = await fetch('https://api.jikan.moe/v4/anime');
        let result = await response.json();
        allAnime = result.data;
        displayAnime(allAnime);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayAnime(animeList) {
    container.innerHTML = ""; 
    let fragment = document.createDocumentFragment();

    animeList.forEach(element => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        itemDiv.innerHTML = `
            <img class="anime-image" src="${element.images?.jpg?.image_url || ""}" alt="thumb">
            <h2 class="title">${element.title}</h2>
            <p class="type">Type: ${element.type}</p>
            <p class="status">Status: ${element.status}</p>
            <p class="score">⭐ Score: ${element.score || "N/A"}</p>
            <p class="genres">Genres: ${element.genres.map(g => g.name).join(', ')}</p>
            <button class="view-more-btn" onclick="window.open('${element.url}')">View More</button>
        `;

        fragment.append(itemDiv);
    });

    container.append(fragment);
}


function applyFilters() {
    let searchTerm = searchInput.value.toLowerCase();
    let typeLimit = filterType.value;
    let sortOrder = sortScore.value;

    
    let filtered = allAnime.filter(anime => {
        const matchesSearch = anime.title.toLowerCase().includes(searchTerm);
        const matchesType = typeLimit === "all" || anime.type === typeLimit;
        return matchesSearch && matchesType;
    });

    
    if (sortOrder !== "none") {
        filtered.sort((a, b) => {
            return sortOrder === "desc" ? (b.score - a.score) : (a.score - b.score);
        });
    }

    displayAnime(filtered);
}


searchInput.addEventListener('input', applyFilters);
filterType.addEventListener('change', applyFilters);
sortScore.addEventListener('change', applyFilters);

fetchAnime();

