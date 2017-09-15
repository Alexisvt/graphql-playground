import * as fs from 'fs';
import * as path from 'path';

export function loadSchemaFile(schemaName = '', isQuery = true) {
  return new Promise<string>((resolve, reject) => {
    if (schemaName) {
      const pathToResolve = path.resolve(
        'schemas',
        isQuery ? 'types' : '',
        schemaName,
      );

      fs.readFile(pathToResolve, 'utf8', (err, data) => {
        if (err) {
          return reject(err.message);
        }
        return resolve(data);
      });
    } else {
      return reject('Invalid schemaName');
    }
  });
}
