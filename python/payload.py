import requests

# def post_to_collections(url, functionId, data):
def post_to_collections(url, functionId):
    results = {
        "subjects": [],
        "verbs": []
    }
    print(url)
    print(functionId)
    # print(data)
    # for key, values in data.items():
    #     if key not in ["sujetos", "sustantivos"]:
    #         print(f"Ignorando clave desconocida: {key}")
    #         continue
        
    #     for value in values:
    #         # Construir el endpoint para la colección correspondiente
    #         # endpoint = f"{url}/{key}"
    #         endpoint = f"{url}/{functionId}/upsert"
    #         # Realizar la solicitud POST
    #         response = requests.post(endpoint, json={"name": value})
    #         print (response)
    
    # return response
    return results


