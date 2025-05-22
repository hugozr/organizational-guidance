import spacy

# Cargar el modelo en español
nlp = spacy.load("es_core_news_md")

# Texto de entrada
texto = "Formular, proponer, supervisar y evaluar la implementación de mecanismos y estrategias que generen oportunidades de desarrollo ocupacional e inserción laboral de las personas beneficiadas con becas y/o créditos educativos"

# Procesar el texto
doc = nlp(texto)

# Lista de conceptos en singular
conceptos_singular = []

# Recorrer los tokens del documento
for token in doc:
    # Comprobar si el token es un sustantivo en singular
    if token.pos_ == "NOUN" and token.morph.get("Number") == ["Sing"]:
        # Añadir a la lista
        conceptos_singular.append(token.text)

# Evitar duplicados y mostrar los conceptos en singular
conceptos_singular = list(set(conceptos_singular))

# Imprimir los resultados
print("Conceptos en singular:", conceptos_singular)
