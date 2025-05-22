import { CollectionConfig } from 'payload/types';
import { dependencesMassiveLoad, functionsMassiveLoad, functionsUpdateById } from '../utils';

const Functions: CollectionConfig = {
  slug: 'functions',
  auth: false,
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },

  endpoints: [
    {
      path: '/massive-load',
      method: 'post',
      handler: async (req, res, next) => {
        const result: any = await functionsMassiveLoad(req.body);
        console.log(result);
        res.status(200).send({ inserted: result.inserted})
      },
    },
    {
      path: '/update-by-id',
      method: 'post',
      handler: async (req, res, next) => {
        const result: any = await functionsUpdateById(req.body);
        console.log(result);
        res.status(200).send({ updated: result.updated})
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
      name: 'article',
      type: 'text',
    },
    {
      name: 'literal',
      type: 'text',
    },
    {
      name: 'subjects',
      type: 'textarea',
    },
    {
      name: 'verbs',
      type: 'textarea',
    },
    {
      name: 'department', // required
      type: 'relationship', // required
      relationTo: 'departments', // required
      hasMany: false,
    },
  ],
}

export default Functions
