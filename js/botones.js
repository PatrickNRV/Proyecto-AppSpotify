const boton1 = document.getElementById("grafico1");
boton1.addEventListener("click", function () {
    fetch('http://127.0.0.1:5000/api/canciones_populares')
        .then(response => response.json())
        .then(data => {
            const grafico = new Graficos(data, "grafico");
            grafico.CancionesMasPopulares();
        })
        .catch(error => console.error('Error al cargar las canciones más populares:', error));
});

const boton2 = document.getElementById("grafico2");
boton2.addEventListener("click", function () {
    fetch('http://127.0.0.1:5000/api/relacion_ano_streams')
        .then(response => response.json())
        .then(data => {
            const grafico = new Graficos(data, "grafico");
            grafico.RelacionAnoStreams();
        })
        .catch(error => console.error('Error al cargar la relación año-streams:', error));
});

const boton3 = document.getElementById("grafico3");
boton3.addEventListener("click", function () {
    fetch('http://127.0.0.1:5000/api/relacion_artistas_streams')
        .then(response => response.json())
        .then(data => {
            const grafico = new Graficos(data, "grafico");
            grafico.RelacionArtistasStreams();
        })
        .catch(error => console.error('Error al cargar la relación artistas-streams:', error));
});

const boton4 = document.getElementById("grafico4");
boton4.addEventListener("click", function () {
    fetch('http://127.0.0.1:5000/api/relacion_playlists_streams')
        .then(response => response.json())
        .then(data => {
            const grafico = new Graficos(data, "grafico");
            grafico.RelacionPlaylistsStreams();
        })
        .catch(error => console.error('Error al cargar la relación playlists-streams:', error));
});
