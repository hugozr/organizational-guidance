from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

# Cargar un modelo de BETO en español
model_name = "dccuchile/bert-base-spanish-wwm-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)

# Crear un pipeline para etiquetado de entidades
nlp_ner = pipeline("ner", model=model, tokenizer=tokenizer)

# Ejemplo de texto en español
texto = "El perro corre rápido por el parque de Barcelona."

# Extraer entidades nombradas
resultado = nlp_ner(texto)
print(resultado)
