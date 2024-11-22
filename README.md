# Proyecto-AppSpotify
Una página web para visualizar datos músicales de la APP Spotify depurados, trabajados y analizados.

### Spotify 2023 - Análisis de Canciones Más Escuchadas

---

#### **Descripción del Dataset**

Este proyecto utiliza un dataset que contiene una lista detallada de las canciones más famosas del año 2023 según Spotify. El dataset incluye características adicionales que no suelen estar disponibles en datasets similares, proporcionando información valiosa sobre los atributos de cada canción, su popularidad y su presencia en diversas plataformas musicales.

**Atributos del dataset:**
1. **track_name**: Nombre de la canción.
2. **artist(s)_name**: Nombre(s) del/los artista(s) de la canción.
3. **artist_count**: Número de artistas que contribuyeron a la canción.
4. **released_year**: Año de lanzamiento de la canción.
5. **released_month**: Mes de lanzamiento de la canción.
6. **released_day**: Día de lanzamiento de la canción.
7. **in_spotify_playlists**: Número de playlists de Spotify en las que aparece la canción.
8. **in_spotify_charts**: Presencia y ranking de la canción en los charts de Spotify.
9. **streams**: Número total de reproducciones en Spotify.
10. **in_apple_playlists**: Número de playlists de Apple Music en las que aparece la canción.

---

#### **Objetivo del Proyecto**

El objetivo del proyecto es analizar los datos de las canciones más populares en Spotify y generar un **dashboard interactivo** utilizando **Python (Flask)** para el back-end y **Plotly.js** para la visualización de gráficos. Este dashboard permite explorar visualmente varias tendencias y relaciones dentro del dataset, como:

1. **Las canciones más populares**: Un gráfico de barras que muestra las canciones con mayor cantidad de streams.
2. **Relación entre el año de lanzamiento y las reproducciones**: Un gráfico de pastel que clasifica los streams según el año de lanzamiento en categorías como "Antes de 2000", "Entre 2000-2009", "Entre 2010-2019" y "Más que 2020".
3. **Relación entre el número de artistas y las reproducciones**: Un gráfico de dispersión que conecta los puntos más altos de cada cantidad de artistas.
4. **Relación entre la cantidad de playlists y las reproducciones**: Un diagrama de puntos con una regresión lineal superpuesta para identificar tendencias.

---

#### **Librerías Utilizadas**

Para ejecutar el proyecto, es necesario instalar las siguientes dependencias:

```bash
pip install Flask
pip install flask-cors
pip install plotly
```

---

#### **Estructura del Proyecto**

1. **preproceso_spo.py**: Script para procesar y depurar el archivo CSV, generando un archivo JSON con los datos necesarios para el análisis.
2. **app_spo.py**: Archivo principal del back-end. Define los endpoints de la API que procesan y devuelven los datos al front-end.
3. **js/graficos.js**: Contiene las funciones para generar los gráficos interactivos utilizando Plotly.js.
4. **js/botones.js**: Maneja los eventos de los botones en el front-end para cargar los gráficos dinámicamente.
5. **index.html**: Interfaz del usuario que muestra los gráficos y proporciona una experiencia interactiva.
6. **data/spotify-2023.csv**: Dataset original (entrada).
7. **data/spotify-2023.json**: Dataset procesado (salida).

---

#### **Endpoints de la API**

1. `/api/canciones_populares`: Devuelve las 10 canciones más populares basadas en streams.
2. `/api/relacion_ano_streams`: Agrupa los streams por rango de años de lanzamiento y devuelve los datos para un gráfico de pastel.
3. `/api/relacion_artistas_streams`: Devuelve los streams agrupados por cantidad de artistas.
4. `/api/relacion_playlists_streams`: Calcula la relación entre la cantidad de playlists (Spotify y Apple) y los streams.

---

#### **Visualizaciones Generadas**

1. **Gráfico de Barras: Las Canciones Más Populares**  
   Muestra las canciones con mayor cantidad de streams.

2. **Gráfico de Pastel: Relación Año-Streams**  
   Agrupa las reproducciones según el año de lanzamiento.

3. **Gráfico de Dispersión: Relación Artistas-Streams**  
   Conecta los puntos más altos de streams para cada cantidad de artistas.

4. **Gráfico de Puntos con Regresión: Relación Playlists-Streams**  
   Muestra la correlación entre la cantidad de playlists y los streams, con una línea de regresión lineal.

---

#### **Cómo Ejecutar el Proyecto**

1. **Procesar el CSV**:
   Ejecutar `preproceso_spo.py` para convertir el archivo CSV en un JSON depurado:
   ```bash
   python preproceso_spo.py
   ```

2. **Iniciar el Back-End**:
   Correr el archivo `app_spy.py` para iniciar el servidor Flask:
   ```bash
   python app.py
   ```

3. **Abrir el Dashboard**:
   Abre `index.html` en tu navegador para explorar los gráficos interactivos. En su defecto se puede ejecutar desde el icono de la carpeta.

---

#### **Consideraciones Finales**

Este proyecto está diseñado para ser modular y fácilmente extensible. Si deseas agregar nuevos análisis o gráficos, simplemente:
1. Actualiza los datos en el preprocesamiento.
2. Crea un nuevo endpoint en `app.py`.
3. Agrega un método en `graficos.js` y un botón correspondiente en `index.html`.
