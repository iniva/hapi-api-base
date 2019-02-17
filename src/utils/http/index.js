import got from 'got';

import Config from 'Config/index';
import Logger from '../logger';

const log = Logger.create('utils:http');

const getHooks = () => {
  const logError = error => {
    if (Config.get('debug.error')) {
      log('Debug: Error');
      log(error);
    }

    return error;
  };

  const logRequest = async options => {
    if (Config.get('debug.request')) {
      log('Debug: Request Options');
      log(options);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const logRetry = (options, error, retryCount) => {
    log(`Retrying request [${retryCount} time]`);
  };

  // eslint-disable-next-line no-unused-vars
  const logAfterResponse = (response, retryWithMergedOptions) => {
    if (Config.get('debug.response')) {
      log('Debug: Response');
      log(response);
    }

    return response;
  };

  return {
    beforeError: [logError],
    init: [],
    beforeRequest: [logRequest],
    beforeRedirect: [],
    beforeRetry: [logRetry],
    afterResponse: [logAfterResponse],
  };
};

export default class HTTP {
  constructor(options = {}) {
    const defaultOptions = {
      headers: {
        'user-agent': Config.get('userAgent'),
      },
      responseType: 'json',
      json: true,
      hooks: getHooks(),
    };

    const fullOptions = got.mergeOptions(defaultOptions, options);
    const defaults = {
      handler: got.defaults.handler,
      options: got.mergeOptions(got.defaults.options, fullOptions),
      mutableDefaults: got.defaults.mutableDefaults,
    };

    this.instance = got.create(defaults);
  }

  async request(endpoint, options) {
    const config = this.instance.mergeOptions(this.instance.defaults.options, options);

    return this.instance(endpoint, config);
  }

  async get(endpoint, options = {}) {
    options.method = 'get';

    return this.request(endpoint, options);
  }

  async post(endpoint, options = {}) {
    options.method = 'post';

    return this.request(endpoint, options);
  }
}
