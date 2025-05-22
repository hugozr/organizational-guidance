from pymongo import MongoClient
import pandas as pd

# Configuración de MongoDB
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "payload-ogs"
COLLECTION_NAME = "capabilities"

# Conexión a MongoDB
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Leer todos los documentos de la colección
data = list(collection.find())

# Convertir ObjectId a texto para exportarlo correctamente
for doc in data:
    doc['_id'] = str(doc['_id'])

# Crear un DataFrame de pandas
df = pd.DataFrame(data)

# Exportar los datos a un archivo Excel
output_file = "capac.xlsx"
df.to_excel(output_file, index=False, engine='openpyxl')

print(f"Datos exportados exitosamente a {output_file}")

# Cerrar la conexión
client.close()
