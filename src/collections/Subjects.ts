import { CollectionConfig } from 'payload/types';
import { dependencesMassiveLoad, functionsMassiveLoad, upsertSubject } from '../utils';

const Subjects: CollectionConfig = {
  slug: 'subjects',
  auth: false,
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },

  endpoints: [
    {
      path: '/:functionId/upsert',
      method: 'post',
      handler: async (req, res, next) => {
        const result: any = await upsertSubject(req.params.functionId, req.body);
        console.log(result);
        res.status(200).send({ result })
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
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default Subjects
