import * as fs from "fs";
import * as path from "path";

export const loadSchemaFile = (schemaName = "", isQuery = true) => {
  return new Promise((resolve, reject) => {

    if (schemaName) {

      const pathToResolve = path.resolve("src", "schemas", isQuery ? "types" : "", schemaName);

      fs.readFile(pathToResolve, "utf8", (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    } else {
      return reject("Invalid schemaName");
    }
  });

};