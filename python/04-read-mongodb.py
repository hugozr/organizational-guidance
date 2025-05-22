import llm
import json
import requests
import random

from pymongo import MongoClient

def get_all_documents_from_functions(db_url, db_name, collection_name="functions"):
    try:
        # Conectar a la base de datos
        client = MongoClient(db_url)
        db = client[db_name]
        collection = db[collection_name]
        
        # Obtener todos los documentos de la colección
        documents = list(collection.find())
        # documents = list(collection.aggregate([{"$sample": {"size": 5}}]))

        return documents
    except Exception as e:
        print(f"Error al conectar o leer la colección: {e}")
        return []

# Ejemplo de uso
if __name__ == "__main__":
    # Cambia estos valores según tu configuración
    DATABASE_URL = "mongodb://localhost:27017/"
    DATABASE_NAME = "payload-ogs"
    url = "http://10.200.8.195:11434/v1/completions"
    subjectsUrl = "http://localhost:3000/api/subjects"
    functionsUrl = "http://localhost:3000/api/functions"
    model = "llama3:8b"
    # Leer los documentos
    functions = get_all_documents_from_functions(DATABASE_URL, DATABASE_NAME)
    # functions = random.shuffle(functions)
    print (functions)

    
    if functions:
        print(f"Se encontraron {len(functions)} documentos en 'functions':")
        counter = 0
        for doc in functions:
            name = doc["name"]
            # prompt = f"En el siguiente texto en español: '{name}' obtén una lista de los sujetos y sustantivos. Retorna una lista JSON que contenga los sujetos (sin su artículo), sustantivos (sin su artículo) y los verbos en infinitivo. Retorna únicamente el JSON sin introducción ni explicación adicional y con los keys sujetos, sustantivos y verbos."
            # prompt = f"Estoy haciendo un análisis para encontrar Entidades para mi Modelo Entidad-Relacion y quiero que en el siguiente texto en español (que es una función de una unidad orgánica de MINEDU): '{name}' obtengas una lista de las entidades que debo considerar para mi modelo. Retorna un arreglo que contenga las entidades (sin su artículo). Retorna únicamente el arreglo sin introducción ni explicación adicional."
            # prompt = f"Analiza el siguiente texto en español, que describe una función de una unidad orgánica de un Ministerio: '{name}'. Identifica las entidades relevantes para un Modelo Entidad-Relación y retorna un arreglo unidimensional con los nombres de las entidades en singular, no incluyas artículos y no incluyas explicaciones. Devuelve únicamente el arreglo."
            # prompt = f"Analiza el siguiente frase en español, que describe una función de una unidad orgánica de un Ministerio: '{name}'. Identifica las entidades relevantes para un Modelo Entidad-Relación y retorna un arreglo unidimensional con los nombres de las entidades en singular, no incluyas artículos y no incluyas explicaciones. Devuelve únicamente el arreglo. Ten en cuenta que las entidades son personas, lugares, objetos o conpceptos que son de interés y deben ser registrados. Sólo debes ceñirte a la frase"
            # prompt = f"Analiza el siguiente frase en español, que describe una función de una unidad orgánica de un Ministerio: '{name}'. Identifica las entidades relevantes para un Modelo Entidad-Relación y retorna un arreglo unidimensional con los nombres de las entidades en singular, no incluyas artículos y no incluyas explicaciones. Devuelve únicamente el arreglo. Ten en cuenta que las entidades son personas, lugares, objetos o conpceptos que son de interés y deben ser registrados. Sólo debes ceñirte a la frase"
            # prompt = 
            # f"Asume el rol de analista de sistemas y en la siguiente frase: '{name}'
            #  identifica todas las entidades para mi Modelo Entidad-Relación.
            #  Retórname únicamente el arreglo simple de solo las ENTIDADES que identifiques 
            # (separado por comas y entre corchetes), 
            # sin introducción ni el análisis que hayas realizado.
            #  Recuerda que las Entidades son cualquier objeto, concepto, persona, lugar, actividad, oficina o tema que sean de interés para poder registrar en base de datos."
            prompt = f"Asume el rol de analista de sistemas y en la siguiente frase: '{name}' identifica todos los verbos. Retórname únicamente el arreglo simple de solo los VERBOS que identifiques (separado por comas y entre corchetes), sin introducción ni el análisis que hayas realizado."
            functionId = doc["_id"]
            respuesta, tiempo = llm.process_function(prompt, url, model)
            print("Prompt:", prompt)
            print("Respuesta:", respuesta)
            print("Tiempo de ejecución:", tiempo, "segundos")
            prompt_ok = True
            if prompt_ok:
                # json_a = json.loads(respuesta)
                print(respuesta)
                endpoint = f"{functionsUrl}/{functionId}"
                response = requests.patch(endpoint, json={"verbs": respuesta})
                    # for sujeto in json_a:
                    #     print(sujeto)
                    #     endpoint = f"{subjectsUrl}/{functionId}/upsert"
                    #     response = requests.post(endpoint, json={"name": sujeto})
            if counter == 1000:
                break
            counter = counter + 1
    else:
        print("No se encontraron documentos o hubo un error.")
