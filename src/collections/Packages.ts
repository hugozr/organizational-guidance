import { CollectionConfig } from 'payload/types';
import { capabilitiesMassiveLoad, dependencesMassiveLoad, functionsMassiveLoad, functionsUpdateById, packagesMassiveLoad } from '../utils';

const Packages: CollectionConfig = {
  slug: 'packages',
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
        const result: any = await packagesMassiveLoad(req.body);
        console.log(result);
        res.status(200).send({ inserted: result.inserted})
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
      name: 'father', // required
      type: 'relationship', // required
      relationTo: 'packages', // required
      hasMany: false,
    },
  ],
}

export default Packages
