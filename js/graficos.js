class Graficos {
    constructor(data, etiqueta) {
        this.data = data;
        this.etiqueta = etiqueta;
    }

    CancionesMasPopulares() {
        const trace = {
            x: this.data.map(item => item.Cancion),
            y: this.data.map(item => item.Popularidad),
            type: 'bar'
        };
        const layout = {
            title: 'Las Canciones Más Populares',
            xaxis: { title: 'Canción' },
            yaxis: { title: 'Popularidad' }
        };
        Plotly.newPlot(this.etiqueta, [trace], layout);
    }




    
    RelacionAnoStreams() {
        // Agrupar los streams por rangos de años
        const grupos = {
            "Después del 2020": 0,
            "Entre 2010 y 2019": 0,
            "Entre 2000 y 2009": 0,
            "Antes de los 2000": 0
        };
    
        this.data.forEach(item => {
            const ano = item.Ano; // Año de lanzamiento
            const streams = item.Streams; // Streams
    
            if (ano > 2020) {
                grupos["Después del 2020"] += streams;
            } else if (ano >= 2010 && ano <= 2019) {
                grupos["Entre 2010 y 2019"] += streams;
            } else if (ano >= 2000 && ano <= 2009) {
                grupos["Entre 2000 y 2009"] += streams;
            } else if (ano < 2000) {
                grupos["Antes de los 2000"] += streams;
            }
        });
    
        // Preparar los datos para el gráfico
        const labels = Object.keys(grupos); // Nombres de las rebanadas
        const values = Object.values(grupos); // Valores de las rebanadas
    
        const trace = {
            labels: labels,
            values: values,
            type: 'pie', // Tipo de gráfico de pastel
            textinfo: 'label+percent', // Mostrar etiquetas y porcentajes
            hoverinfo: 'label+value' // Mostrar etiqueta y valor al pasar el mouse
        };
    
        const layout = {
            title: 'Relación Año-Streams (Gráfico de Pastel)'
        };
    
        // Renderizar el gráfico
        Plotly.newPlot(this.etiqueta, [trace], layout);
    }
    



    RelacionArtistasStreams() {
        const xData = this.data.map(item => item.Artistas); // Eje X: Cantidad de artistas
        const yData = this.data.map(item => item.Streams); // Eje Y: Streams
    
        // Crear un mapa para almacenar el valor máximo de streams por cantidad de artistas
        const maxStreamsByArtists = {};
        for (let i = 0; i < xData.length; i++) {
            const artistas = xData[i];
            const streams = yData[i];
            if (!maxStreamsByArtists[artistas] || maxStreamsByArtists[artistas] < streams) {
                maxStreamsByArtists[artistas] = streams;
            }
        }
    
        // Extraer los valores ordenados para la línea de máximos
        const uniqueArtists = Object.keys(maxStreamsByArtists).map(Number).sort((a, b) => a - b);
        const maxStreams = uniqueArtists.map(artist => maxStreamsByArtists[artist]);
    
        // Trazar el diagrama de puntos
        const scatterTrace = {
            x: xData,
            y: yData,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 8,
                color: 'blue',
                opacity: 0.8
            },
            name: 'Datos'
        };
    
        // Trazar la línea de máximos
        const maxLineTrace = {
            x: uniqueArtists,
            y: maxStreams,
            mode: 'lines+markers',
            type: 'scatter',
            line: {
                color: 'red',
                width: 2
            },
            marker: {
                size: 8,
                color: 'red'
            },
            name: 'Máximos'
        };
    
        // Configurar el diseño
        const layout = {
            title: 'Relación Artistas-Streams (con Línea de Máximos)',
            xaxis: { title: 'Cantidad de Artistas' },
            yaxis: { title: 'Streams' }
        };
    
        // Renderizar el gráfico
        Plotly.newPlot(this.etiqueta, [scatterTrace, maxLineTrace], layout);
    }
    






    RelacionPlaylistsStreams() {
        // Extraer datos
        const xData = this.data.map(item => item.Playlists); // Eje X: Cantidad de playlists
        const yData = this.data.map(item => item.Streams);  // Eje Y: Streams
    
        // Calcular regresión lineal
        const n = xData.length;
        const xMean = xData.reduce((a, b) => a + b, 0) / n; // Promedio de X
        const yMean = yData.reduce((a, b) => a + b, 0) / n; // Promedio de Y
    
        // Calcular pendiente (m) y la intersección (b) de la regresión
        let numerator = 0;
        let denominator = 0;
        for (let i = 0; i < n; i++) {
            numerator += (xData[i] - xMean) * (yData[i] - yMean);
            denominator += (xData[i] - xMean) ** 2;
        }
        const m = numerator / denominator; // Pendiente
        const b = yMean - m * xMean;       // Intersección
    
        // Generar puntos para la línea de regresión
        const xLine = [Math.min(...xData), Math.max(...xData)];
        const yLine = xLine.map(x => m * x + b);
    
        // Trazar el diagrama de puntos
        const scatterTrace = {
            x: xData,
            y: yData,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 8,
                color: 'blue',
                opacity: 0.8
            },
            name: 'Datos'
        };
    
        // Trazar la línea de regresión
        const regressionTrace = {
            x: xLine,
            y: yLine,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: 'red',
                width: 2
            },
            name: 'Regresión Lineal'
        };
    
        // Configurar el diseño
        const layout = {
            title: 'Relación Playlists-Streams (con Regresión Lineal)',
            xaxis: { title: 'Cantidad de Playlists' },
            yaxis: { title: 'Streams' }
        };
    
        // Renderizar el gráfico
        Plotly.newPlot(this.etiqueta, [scatterTrace, regressionTrace], layout);
    }
    
    
    
    
}
