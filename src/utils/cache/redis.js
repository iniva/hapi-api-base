import IoRedis from 'ioredis';
import { promisify } from 'util';

import { REDIS } from 'Config/cache';
import Logger from 'Utils/logger';
import { Time } from 'Utils/helpers/units';

export default class Redis {
    constructor() {
        this.log = Logger.create('utils:cache:redis');
        this.retries = 0;
        this.settings = REDIS.settings;

        const options = {
            ...REDIS.config,
            retryStrategy: times => {
                const MAX_TIME = Time.toMilliseconds(2);
                const TIME_MULTIPLIER = 500;

                this.retries = times;

                if (this.retries > this.settings.maxAttempts) {
                    return 0;
                }

                // Return delay for next reconnection
                return Math.min(this.retries * TIME_MULTIPLIER, MAX_TIME);
            }
        };

        this.options = options;
        this.client = null;
    }

    async start() {
        return new Promise((resolve, reject) => {
            const client = new IoRedis(this.options);

            client.on('error', error => {
                this.log(`Redis encountered a problem: ${error.message}`);

                switch (error.code) {
                    case 'ENOTFOUND':
                        if (this.retries > this.settings.maxAttempts) {
                            this.log('Max retries to reconnect to Redis exhausted');
                            client.disconnect();
                            this.client = null;

                            return reject(error);
                        }
                        break;
                    case 'ECONNREFUSED':
                    case 'ETIMEDOUT':
                        return undefined;
                }

                return undefined;
            });

            client.on('reconnecting', () => {
                this.log('Trying to reconnect to Redis');
            });

            client.once('ready', () => {
                this.log('Redis is ready for connections');
                this.client = client;

                this.methods = {
                    exists: promisify(this.client.exists).bind(this.client),
                    get: promisify(this.client.get).bind(this.client),
                    set: promisify(this.client.set).bind(this.client),
                    del: promisify(this.client.del).bind(this.client),
                    quit: promisify(this.client.quit).bind(this.client)
                };

                return resolve();
            });
        });
    }

    isReady() {
        if (!this.client) {
            throw new Error('Redis client is not ready or connection was closed');
        }
    }

    async stop() {
        this.isReady();

        return this.methods.quit();
    }

    async has(key) {
        this.isReady();

        return this.methods.exists(key);
    }

    async get(key) {
        this.isReady();

        return this.methods.get(key);
    }

    async set(key, value, ttl) {
        this.isReady();

        return this.methods.set(key, value, 'ex', ttl);
    }

    async drop(key) {
        this.isReady();

        return this.methods.del(key);
    }
}
