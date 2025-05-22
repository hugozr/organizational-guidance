import requests
import time


def process_function (prompt, url, model):
  headers = {"Content-Type": "application/json"}
  data = {
    "model": model,
    "prompt": prompt,
    "max_tokens": 1000,
    "temperature": 0.1,
    # Agrega aquí otros parámetros si los necesitas
  }

  start_time = time.time()
  response = requests.post(url, headers=headers, json=data)
  end_time = time.time()

  response_json = response.json()
  if "choices" in response_json:
    return response_json["choices"][0]["text"].strip(), end_time - start_time
  else:
    return "Error al obtener la respuesta", 0

# Ejemplo de uso:
# prompt = "Usando el idioma español dime una breve biografía de Napoleón Bonaparte"
# prompt = "Extrae del siguiente texto en español: 'Formular, proponer y evaluar políticas, estrategias y mecanismos que promuevan el acceso a becas y crédito educativo' una lista JSON que contenga los sujetos y los verbos en infinitivo. Retorna únicamente el JSON sin introducción ni explicación adicional."
#################
# prompt = "En el siguiente texto en español: 'Formular, proponer y evaluar políticas, estrategias y mecanismos que promuevan el acceso a becas y crédito educativo' obtén una lista de los sujetos y sustantivos. Retorna una lista JSON que contenga los sujetos, sustantivos y los verbos en infinitivo. Retorna únicamente el JSON sin introducción ni explicación adicional."
# url = "http://10.200.8.195:11434/v1/completions"
# model = "llama3:8b"
# respuesta, tiempo = get_gpt4all_response(prompt, url, model)
# print("Respuesta:", respuesta)
# print("Tiempo de ejecución:", tiempo, "segundos")
################

# Ejemplo de uso
if __name__ == "__main__":
    url = "http://localhost:3000/api/subjects"  # Reemplaza con tu URL
    data = {
        "subject": ["políticas", "estrategias", "mecanismos"],
        "nouns": ["becas", "crédito educativo"],
        "verbs": ["formular", "proponer", "evaluar"]
    }
    
    result = post_to_collections(url, data)
    # print(result)
