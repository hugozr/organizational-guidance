import { CollectionConfig } from 'payload/types';
import { dependencesMassiveLoad, updateFunctionDescription } from '../utils';

const Departments: CollectionConfig = {
  slug: 'departments',
  auth: false,
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
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
        const tracking: any = await dependencesMassiveLoad(req.body);
        res.status(200).send({ result: "ok" })
      },
    },
    {
      path: '/update-function-description',
      method: 'post',
      handler: async (req, res, next) => {
        const upd: any = await updateFunctionDescription(req.body);
        res.status(200).send({ updated: upd })
      },
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'functionDescription',
      type: 'textarea',
    },
    {
      name: 'article',
      type: 'text',
    },
    {
      name: 'father', // required
      type: 'relationship', // required
      relationTo: 'departments', // required
      hasMany: false,
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
