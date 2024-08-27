import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

export const postSchema: CollectionCreateSchema = {
  name: 'posts',
  fields: [
    { name: 'title', type: 'string', facet: false, sort: true },
    { name: 'content', type: 'string', facet: false },
    { name: 'topic', type: 'string', facet: false },
    { name: 'forum', type: 'string', facet: false },
    { name: 'author', type: 'string', facet: false },
  ],
  default_sorting_field: 'title',
};
