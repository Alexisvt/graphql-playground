import { camelizeKeys } from 'humps';
import _ from 'lodash';

export function slug(str: string) {
  return str.toLowerCase().replace(/[\s\W-]+/, '-');
}

export const orderedFor = (rows, collection, field, singleObject) => {
  // return the rows ordered for the collection
  const data = camelizeKeys(rows);
  const inGroupsOfField = _.groupBy(data, field);

  return collection.map(element => {
    const elementArray = inGroupsOfField[element];
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }
    return singleObject ? {} : [];
  });
};

export default {
  nodeEnv: process.env.NODE_ENV || 'development'
};
