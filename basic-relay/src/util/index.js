// @flow
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

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

export const loadSchemaFile = (schemaName = '', isQuery = true) => {
  return new Promise((resolve, reject) => {


    if (schemaName) {

      const pathToResolve = path.resolve('src','schema', isQuery ? 'types' : '', schemaName);
      
      fs.readFile(pathToResolve, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    }

    // return reject('invalid schemaName');
  });

};