// @flow
import WebpackPluginGraphqlSchemaHot from 'webpack-plugin-graphql-schema-hot';
import { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
  plugins: [
    new WebpackPluginGraphqlSchemaHot({
      schemaPath: path.resolve
    })
  ]
};

export default config;