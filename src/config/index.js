import merge from 'webpack-merge';
import Path from 'path';

import { STATUSES } from 'Utils/http/statusCodes';
import { DAY, toMilliseconds } from 'Utils/helpers/units';
import * as packageInfo from '../../package';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';
const SERVER_PORT = process.env.SERVER_PORT || 8091; // eslint-disable-line no-magic-numbers
const CACHE_DRIVER = process.env.CACHE_DRIVER || 'memory';
const CACHE_DEFAULT_TTL = process.env.CACHE_DEFAULT_TTL || 3600; // eslint-disable-line no-magic-numbers
const APP_NAME = process.env.APP_NAME || 'Hapi API';
const API_VERSION = packageInfo.version;
const DISCOVERY_SERVICE_MASK = process.env.DISCOVERY_SERVICE_MASK || 'service::';

const rootDir = Path.dirname(require.main.filename || process.mainModule.filename);
const defaultConfig = {
    debug: {
        global: false,
        request: false,
        response: false,
        error: false
    },

    rootDir,

    userAgent: `${APP_NAME}/${API_VERSION}`,

    version: API_VERSION,

    services: {
        mask: DISCOVERY_SERVICE_MASK
    },

    cache: {
        environment: ENVIRONMENT,
        // available: redis, memory
        // "memory" available only in development
        driver: CACHE_DRIVER,
        // TTL in seconds
        ttl: CACHE_DEFAULT_TTL
    },

    server: {
        app: {
            version: API_VERSION
        },
        host: SERVER_HOST,
        port: SERVER_PORT,
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
                expiresIn: toMilliseconds(DAY)
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
