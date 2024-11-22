import csv
import json

# Nombre del archivo CSV que queremos convertir
archivo_csv = 'data/spotify-2023.csv'

# Nombre del archivo JSON de salida
archivo_json = 'data/spotify-2023.json'

# Función para verificar si un valor es numérico
def es_numero(valor):
    try:
        float(valor)
        return True
    except ValueError:
        return False

# Campos a mantener
campos_a_conservar = [
    "track_name", "artist(s)_name", "artist_count", 
    "released_year", "released_month", "released_day", 
    "in_spotify_playlists", "in_spotify_charts", "streams", 
    "in_apple_playlists"
]

# Campos a depurar
campos_a_depurar = [
    "released_year", "released_month", "released_day", 
    "in_spotify_playlists", "in_spotify_charts", "streams", 
    "in_apple_playlists"
]

# Leer el archivo CSV y almacenarlo como un diccionario
with open(archivo_csv, mode='r', encoding='latin1') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    filas = []
    for row in csv_reader:
        # Crear un nuevo diccionario con solo los campos seleccionados
        nueva_fila = {campo: row.get(campo, "Unknown") for campo in campos_a_conservar}
        
        # Depurar los campos numéricos
        for campo in campos_a_depurar:
            if campo in nueva_fila:
                nueva_fila[campo] = int(float(nueva_fila[campo])) if es_numero(nueva_fila[campo]) else 0

        filas.append(nueva_fila)

# Escribir los datos en un archivo JSON
with open(archivo_json, mode='w', encoding='utf-8') as json_file:
    json.dump(filas, json_file, indent=4, ensure_ascii=False)

print(f'Archivo {archivo_json} creado exitosamente.')
