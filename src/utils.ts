import payload from "payload";

export const dependencesMassiveLoad = async (dependenciesJSON: any) => {
  const insertedDepartments = {};

  for (const dependency of dependenciesJSON.departments) {
    // Inserta cada dependencia en la colección Dependency
    const insertedDepartment = await payload.create({
      collection: 'departments',
      data: {
        name: dependency.dependency,
        type: dependency.type
      }
    });
    // Almacena el ID insertado en un objeto para referencia rápida
    insertedDepartments[dependency.dependency] = insertedDepartment.id;
    // Verifica si la dependencia tiene un padre y actualiza el campo father
    if (dependency.father) {
      const fatherId = insertedDepartments[dependency.father];
      if (fatherId) {
        await payload.update({
          collection: 'departments',
          id: insertedDepartment.id,
          data: {
            father: fatherId
          }
        });
      }
    }
  }
}

export const functionsMassiveLoad = async (functionsJSON: any) => {
  let inserted = 0;
  for (const funct of functionsJSON) {
    const functionDocs = await payload.find({
      collection: 'functions',
      where: {
        and: [
          {
            article: {
              equals: funct.articulo,
            }
          },
          {
            literal: {
              equals: funct.literal,
            }
          },
        ]
      },
    })
    if(functionDocs.docs[0]){
      continue; //Si ya estiste el articulo y el literal, ya no hace nada y pasa al siguiente elemento en el for
    }
    // Inserta cada funcion en la colección Functions
    const departments = await payload.find({
      collection: 'departments',
      where: {
        name: {
          equals: funct.unidad_organica,
        },
      },
    })
    if (departments.docs[0]) {
      const insertedFunction = await payload.create({
        collection: 'functions',
        data: {
          department: departments.docs[0].id,
          name: funct.funcion,
          article: funct.articulo,
          literal: funct.literal,
        }
      });
      if(insertedFunction){
        inserted++;
      }
    }
  }
  return {inserted}
}

export const updateFunctionDescription = async (functionDescriptionJSON: any) => {
  const department: any = functionDescriptionJSON.unidad_organica;
  console.log(department);
  const departments = await payload.find({
    collection: 'departments',
    where: {
      name: {
        equals: department,
      },
    },
  });
  const toUpdate: any = departments.docs[0];
  if (departments.docs[0]) {
    const updated = await payload.update({
      collection: 'departments',
      id: toUpdate.id,
      data: {
        functionDescription: functionDescriptionJSON.descripcion_funcion,
        article: functionDescriptionJSON.articulo
      }
    });
    return updated;
  }
  return null;
}



