import { CollectionConfig } from 'payload/types';
import { capabilitiesMassiveLoad, dependencesMassiveLoad, functionsMassiveLoad, functionsUpdateById } from '../utils';

const Capabilities: CollectionConfig = {
  slug: 'capabilities',
  auth: false,
  access: {
    // read: () => true,
    read: ({ req }) => {
      const user = req.user;
      if (!user) return false;
      const roles = user?.realm_access?.roles || [];
      return roles.includes('goverment-role');
    },
    update: () => true,
    delete: () => true,
    create: () => true,
  },

  endpoints: [
    {
      path: '/massive-load',
      method: 'post',
      handler: async (req, res, next) => {
        const result: any = await capabilitiesMassiveLoad(req.body);
        console.log(result);
        res.status(200).send({ inserted: result.inserted })
      },
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
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
      name: 'father', // required
      type: 'relationship', // required
      relationTo: 'capabilities', // required
      hasMany: false,
    },
  ],
}

export default Capabilities
