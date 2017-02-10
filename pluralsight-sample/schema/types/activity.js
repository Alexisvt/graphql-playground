// @flow
import { GraphQLUnionType } from 'graphql';
import ContestType from './contest';
import NameType from './name';

export default new GraphQLUnionType({
  name: 'Activity',
  types: [ContestType, NameType],
  resolveType(value: Object) {
    return value.activityType === 'contest' ? ContestType : NameType;
  }
});