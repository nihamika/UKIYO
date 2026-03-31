let container = document.getElementById("container");

async function fetchAnime() {
    try {
        let response = await fetch('https://api.jikan.moe/v4/anime');
        let result = await response.json();

        let animeList = result.data;

        let fragment = document.createDocumentFragment();

        animeList.forEach(element => {
            let itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            let title = document.createElement('h2');
            title.className = 'title';
            title.innerText = element.title;

            let image = document.createElement('img');
            image.className = 'anime-image';
            image.src = element.images?.jpg?.image_url || "";

            let type = document.createElement('p');
            type.className = 'type';
            type.innerText = `Type: ${element.type}`;


            let status = document.createElement('p');
            status.className = 'status';
            status.innerText = `Status: ${element.status}`;

            let score = document.createElement('p');
            score.className = 'score';
            score.innerText = `⭐ Score: ${element.score || "N/A"}`;

            itemDiv.append(
                image,
                title,
                type,
                status,
                score,
            );

            fragment.append(itemDiv);
        });

        container.append(fragment);

    } catch (error) {
        console.error("Error:", error);
    }
}

fetchAnime();

