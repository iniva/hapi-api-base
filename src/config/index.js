'use strict';

import merge from 'webpack-merge';
import Path from 'path';

import { STATUSES } from 'Utils/http/statusCodes';
import { Time } from 'Utils/helpers/units';
import * as packageInfo from '../../package';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const DEFAULT_SERVER_PORT = 8091;
const DEFAULT_CACHE_TTL = 3600;

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
    debug: {
        global: false,
        request: false,
        response: false
    },

    rootDir,

    userAgent: `${process.env.APP_NAME}/${packageInfo.version}`,

    cache: {
        environment: ENVIRONMENT,
        // available: redis, memory
        // "memory" available only in development
        driver: process.env.CACHE_DRIVER || 'memory',
        // TTL in seconds
        ttl: process.env.CACHE_DEFAULT_TTL || DEFAULT_CACHE_TTL
    },

    server: {
        host: process.env.SERVER_HOST || '0.0.0.0',
        port: process.env.SERVER_PORT || DEFAULT_SERVER_PORT,
        router: {
            stripTrailingSlash: true
        },
        routes: {
            state: {
                // Avoid errors when receiving invalid cookies
                parse: false,
                failAction: 'ignore'
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['X-Requested-With']
            },
            cache: {
                privacy: 'public',
                statuses: [STATUSES.OK],
                otherwise: 'no-cache',
                expiresIn: Time.toMilliseconds(Time.DAY)
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
const { 'default': targetConfig } = require(`./${ENVIRONMENT}`);
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
