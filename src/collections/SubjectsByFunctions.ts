import { CollectionConfig } from 'payload/types';
import { dependencesMassiveLoad, functionsMassiveLoad } from '../utils';

const SubjectsByFunctions: CollectionConfig = {
  slug: 'subjects-by-functions',
  auth: false,
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
  },

  endpoints: [
  ],
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects'
    },
    {
      name: 'function',
      type: 'relationship',
      relationTo: 'functions'
    },
  ],
}

export default SubjectsByFunctions
