import { CollectionConfig } from 'payload/types';
import { dependencesMassiveLoad } from '../utils';

const Departments: CollectionConfig = {
  slug: 'departments',
  auth: true,
  access: {
    read: () => true,
    update: () => true,
  },
  // Ejemplo de una configuración de acceso que permite acceso a todos los usuarios autenticados
  // access: {
  //   read: ({ req: { user } }) => !!user, // Permitir si el usuario está autenticado
  //   update: ({ req: { user } }) => user?.role === 'admin', // Solo los admins pueden actualizar
  // }
  endpoints: [
    {
      path: '/massive-load',
      method: 'post',
      handler: async (req, res, next) => {
        console.log("ANT");
        const tracking: any = dependencesMassiveLoad();
        res.status(200).send({ result: "ok" })
        // const tracking: any = dependencesMassiveLoad(req.params.id)
        // if (tracking) {
        //   res.status(200).send({ tracking })
        // } else {
        //   res.status(404).send({ error: 'not found' })
        // }
      },
    },
  ],
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'functions',
      type: 'textarea',
    },
    {
      name: 'type', // required
      type: 'select', // required
      options: [
        {
          "label": "Órgano de Alta Dirección",
          "value": "organo_de_alta_direccion"
        },
        {
          "label": "Órgano Consultivo",
          "value": "organo_consultivo"
        },
        {
          "label": "Órgano de Control",
          "value": "organo_de_control"
        },
        {
          "label": "Órgano de Defensa Jurídica",
          "value": "organo_de_defensa_juridica"
        },
        {
          "label": "Órgano de Asesoramiento",
          "value": "organo_de_asesoramiento"
        },
        {
          "label": "Órgano de Apoyo",
          "value": "organo_de_apoyo"
        },
        {
          "label": "Órgano de Línea",
          "value": "organo_de_linea"
        },
        {
          "label": "Órgano Desconcentrado",
          "value": "organo_desconcentrado"
        },
        {
          "label": "Programa",
          "value": "programa"
        }
      ]
    },
  ],
}

export default Departments
