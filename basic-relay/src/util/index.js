// @flow
import _ from 'lodash';
import fs from 'fs';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

export const orderedFor = (rows = [], collection = [], field = '', singleObject = false) => {
  // return the rows ordered for the collection
  const inGroupsOfField = _.groupBy(rows, field);
  return collection.map(element => {
    const elementArray = inGroupsOfField[element];
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }
    return singleObject ? {} : [];
  });
};

export const createSchemaJsonFile = async (schema) => {
  if (schema) {
    const jsonString = await graphql(schema, introspectionQuery);

    return new Promise((resolve, reject) => {
      fs.writeFile('./src/schema/schema.json', JSON.stringify(jsonString, null, 2), err => {
        if (err) return reject(err);
        return resolve('JSON schema created');
      });
    });
  }
  return Promise.reject('Invalid SchemaFile');
};