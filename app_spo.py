from flask import Flask, jsonify, render_template
from flask_cors import CORS
import json

app = Flask(__name__)
# Configurar CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Ruta principal para el dashboard
@app.route('/')
def index():
    return render_template('index.html')

# Cargar los datos del archivo JSON
def cargar_datos():
    with open('data/spotify-2023.json', 'r', encoding='utf-8') as archivo_json:
        datos = json.load(archivo_json)
    return datos

# Función 1: Las canciones más populares
def canciones_mas_populares(datos, limite=10):
    canciones_ordenadas = sorted(datos, key=lambda x: float(x.get('streams', 0)), reverse=True)
    resultado = [
        {"Cancion": cancion.get("track_name", "Unknown"), 
         "Artista": cancion.get("artist(s)_name", "Unknown"), 
         "Popularidad": int(float(cancion.get("streams", 0)))}  
        for cancion in canciones_ordenadas[:limite]
    ]
    return resultado

# Función 2: Relación entre año de lanzamiento y streams
def relacion_ano_streams(datos):
    resultado = [
        {"Ano": int(cancion.get("released_year", 0)), 
         "Streams": int(float(cancion.get("streams", 0)))}  
        for cancion in datos if cancion.get("released_year") and cancion.get("streams")
    ]
    return resultado

# Función 3: Relación entre cantidad de artistas y streams
def relacion_artistas_streams(datos):
    resultado = [
        {"Artistas": int(cancion.get("artist_count", 0)), 
         "Streams": int(float(cancion.get("streams", 0)))}  
        for cancion in datos if cancion.get("artist_count") and cancion.get("streams")
    ]
    return resultado

# Función 4: Relación entre cantidad de playlists y streams
def relacion_playlists_streams(datos):
    resultado = [
        {"Playlists": int(cancion.get("in_apple_playlists", 0)) + int(cancion.get("in_spotify_playlists", 0)), 
         "Streams": int(float(cancion.get("streams", 0)))}  
        for cancion in datos if cancion.get("in_apple_playlists") and cancion.get("in_spotify_playlists") and cancion.get("streams")
    ]
    return resultado

# Endpoints
@app.route('/api/canciones_populares', methods=['GET'])
def endpoint_canciones_mas_populares():
    try:
        datos = cargar_datos()
        resultado = canciones_mas_populares(datos)
        return jsonify(resultado)
    except Exception as e:
        print(f"Error en /api/canciones_populares: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/api/relacion_ano_streams', methods=['GET'])
def endpoint_relacion_ano_streams():
    try:
        datos = cargar_datos()
        resultado = relacion_ano_streams(datos)
        return jsonify(resultado)
    except Exception as e:
        print(f"Error en /api/relacion_ano_streams: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/api/relacion_artistas_streams', methods=['GET'])
def endpoint_relacion_artistas_streams():
    try:
        datos = cargar_datos()
        resultado = relacion_artistas_streams(datos)
        return jsonify(resultado)
    except Exception as e:
        print(f"Error en /api/relacion_artistas_streams: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500

@app.route('/api/relacion_playlists_streams', methods=['GET'])
def endpoint_relacion_playlists_streams():
    try:
        datos = cargar_datos()
        resultado = relacion_playlists_streams(datos)
        return jsonify(resultado)
    except Exception as e:
        print(f"Error en /api/relacion_playlists_streams: {e}")
        return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True)
