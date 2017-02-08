import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'ContestStatusType',
  values: {
    DRAFT: { value: 'draft' },
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' }
  }
});