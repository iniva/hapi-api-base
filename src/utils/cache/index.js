import Joi from '@hapi/joi';

import Redis from './redis';
import Memory from './memory';
import Logger from 'Utils/logger';

const schema = Joi.object().keys({
  environment: Joi.string()
    .required(),
  driver: Joi.string()
    .when('environment', {
      is: 'development',
      then: Joi.valid(['redis', 'memory']),
      otherwise: Joi.valid(['redis']),
    })
    .required(),
  ttl: Joi.number()
    .integer()
    .greater(0)
    .required(),
});

const response = async action => {
  try {
    const data = await action;

    return { data };
  } catch (error) {
    return { error };
  }
};

export default class Cache {
  constructor(options) {
    const { error, value } = Joi.validate(options, schema, { abortEarly: false });

    if (error) {
      throw error;
    }

    switch (value.driver) {
      case 'redis':
        this.cache = new Redis();
        break;
      default:
        this.cache = new Memory();
    }

    this.log = Logger.create('utils:cache');
    this.ttl = value.ttl;
  }

  cacheClient() {
    return this.cache;
  }

  async start() {
    return this.cache.start();
  }

  async stop() {
    return this.cache.stop();
  }

  async has(key) {
    return response(this.cache.has(key));
  }

  async get(key) {
    return response(this.cache.get(key));
  }

  async set(key, value, ttl = this.ttl) {
    return response(this.cache.set(key, value, ttl));
  }

  async drop(key) {
    return response(this.cache.drop(key));
  }
}
