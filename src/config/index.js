'use strict';

import merge from 'webpack-merge';
import Path from 'path';

import * as packageInfo from '../../package';

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
  debug: {
    global: false,
    request: false,
    response: false
  },

  rootDir,

  userAgent: `${process.env.APP_NAME}/${packageInfo.version}`,

  server: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || 8091, // eslint-disable-line no-magic-numbers
    router: {
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['X-Requested-With']
      }
    }
  },

  logging: {
    ops: {
      interval: 1000
    },
    reporters: {
      ConsoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
};
const targetConfig = require(`./${process.env.NODE_ENV || 'development'}`);
const configurations = merge(defaultConfig, targetConfig);

const find = (object, property) => {
  const elements = Array.isArray(property) ? property : property.split('.');
  const name = elements[0];
  const value = object[name];

  if (elements.length <= 1) {
    return value;
  }

  if (value === null || typeof value !== 'object') {
    return undefined;
  }

  return find(value, elements.slice(1));
};

export default class Config {
  /**
   * Briefly inspired by https://github.com/lorenwest/node-config
   */
  static get(property) {
    const value = find(configurations, property);

    if (value === undefined) {
      throw new Error(`Configuration property ${property} was not found!`);
    }

    return value;
  }
}
