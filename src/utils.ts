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
  /*
  Formato de entrada en el body:
  [
    {
        "articulo": "50",
        "unidad_organica": "Unidad de Sistemas de Información",
        "funcion": "Analizar, diseñar, programar, comprobar, implementar, supervisar y brindar mantenimiento adecuado a los sistemas de información que requieran los órganos y unidades orgánicas del Ministerio.",
        "literal": "a"
    }
  ]
    */
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
    if (functionDocs.docs[0]) {
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
      if (insertedFunction) {
        inserted++;
      }
    }
  }
  return { inserted }
}

export const functionsUpdateById = async (functionsJSON: any) => {
  /*
  Formato de entrada en el body:
  [
    {"id":"672cbfe981d75f9da68de887", "subjects":"Órganos, Unidades orgánicas del Ministerio, Sistemas de información","verbs":"Analizar, diseñar, programar, comprobar, implementar, supervisar, brindar"},
    {"id":"672cbfe981d75f9da68de88f", "subjects":"Órganos, Unidades orgánicas, Ministerio, Software, Necesidades","verbs":"Evaluar, recomendar, solucionar"},
    {"id":"672cbfe981d75f9da68de897", "subjects":"Órganos, Unidades orgánicas, Sistemas de Información","verbs":"Coordinar, desplegar"},
    {"id":"672cbfe981d75f9da68de89f", "subjects":"Planes de trabajo, Base de datos, Sistemas, Plataforma Tecnológica, Sistemas de Producción","verbs":"Formular, ejecutar, supervisar"}
  ]
  */
  let updated = 0;
  for (const funct of functionsJSON) {
    const update = await payload.update({
      collection: 'functions',
      id: funct.id,
      data:{
        subjects: funct.subjects,
        verbs: funct.verbs
      }
    })
    if(update){
      updated = updated + 1;
    }
  }
  return { updated }
}

export const capabilitiesMassiveLoad = async (functionsJSON: any) => {
  /*
  Formato de entrada en el body:
  [
      {
        "codigo": "PE01.01",
        "descripcion": "Formular la política y estrategia institucional y sectorial",
        "detalle": "Comprende las actividades para la definición de la política pública sectorial, sus prioridades, lineamientos de política, las estrategias y anteproyectos de presupuesto de mediano y largo plazo. Así como su despliegue en la definición de la política institucional, lineamientos institucionales, estrategias y la programación presupuestal de mediano y largo plazo."
      },
  ]
    */
  let inserted = 0;
  for (const funct of functionsJSON) {
    const capabilityDocs = await payload.find({
      collection: 'capabilities',
      where: {
        and: [
          {
            code: {
              equals: funct.codigo,
            }
          },
        ]
      },
    })
    if (capabilityDocs.docs[0]) {
      continue; //Si ya estiste el articulo y el literal, ya no hace nada y pasa al siguiente elemento en el for
    }
    const insertedCapability = await payload.create({
      collection: 'capabilities',
      data: {
        code: funct.codigo,
        name: funct.descripcion,
        description: funct.detalle,
      }
    });
    if (insertedCapability) {
      inserted++;
    }
  }
  return { inserted }
}


export const packagesMassiveLoad = async (functionsJSON: any) => {
  /*
  Formato de entrada en el body:
  [
      {
        "codigo": "PE01.01",
        "descripcion": "Formular la política y estrategia institucional y sectorial",
        "detalle": "Comprende las actividades para la definición de la política pública sectorial, sus prioridades, lineamientos de política, las estrategias y anteproyectos de presupuesto de mediano y largo plazo. Así como su despliegue en la definición de la política institucional, lineamientos institucionales, estrategias y la programación presupuestal de mediano y largo plazo."
      },
  ]
    */
  let inserted = 0;
  for (const funct of functionsJSON) {
    const capabilityDocs = await payload.find({
      collection: 'packages',
      where: {
        and: [
          {
            code: {
              equals: funct.code,
            }
          },
        ]
      },
    })
    if (capabilityDocs.docs[0]) {
      continue; //Si ya estiste el articulo y el literal, ya no hace nada y pasa al siguiente elemento en el for
    }
    const insertedCapability = await payload.create({
      collection: 'packages',
      data: {
        code: funct.code,
        name: funct.name,
        description: funct.description,
        father: funct.father,
      }
    });
    if (insertedCapability) {
      inserted++;
    }
  }
  return { inserted }
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

export const upsertSubject = async (functionId, body: any) => {
  const found = await payload.find({
    collection: 'subjects',
    where: {
      and: [
        {
          name: {
            equals: body.name,
          }
        },
      ]
    },
  })
  if (found.docs[0]) {
    upsertSubjectsByFunctions(functionId, found.docs[0].id);
    return found.docs[0];
  }
  const insert: any = await payload.create({
    collection: 'subjects',
    data: {
      name: body.name
    },
  })
  upsertSubjectsByFunctions(functionId, insert.id);
  return { insert }
}

const upsertSubjectsByFunctions = async (functionId, subjectId) => {
  const found = await payload.find({
    collection: 'subjects-by-functions',
    where: {
      and: [
        {
          function: {
            equals: functionId,
          }
        },
        {
          subject: {
            equals: subjectId,
          }
        },
      ]
    },
  })
  if (found.docs[0]) {
    return found.docs[0];
  }
  const insert: any = await payload.create({
    collection: 'subjects-by-functions',
    data: {
      subject: subjectId,
      function: functionId
    },
  })
  return { insert }
}