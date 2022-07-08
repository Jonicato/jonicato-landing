const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCIBY26K84B5BxnP2GmdaqiA&part=snippet%2Cid&order=date&maxResults=9';

// Si hay contenido lo agrega
const content = null || document.getElementById('content');

//Configuramos los options de la petición
const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
		'X-RapidAPI-Key': 'f7073b1bc1msh919083e52f6081bp18cf37jsnee21ffd2e5cc'
	}
};

//Construimos la función para hacer la petición
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

//Función autoejecutable que imprime en nuestra página tantas veces sea necesario el código para la vista de los videos
(async () => {
    try {
        const videos = await fetchData(API);
        console.log(videos);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,8).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();