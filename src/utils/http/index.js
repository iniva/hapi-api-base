'use strict';

import axios from 'axios';
import _ from 'lodash';

import Config from 'Config/index';
import Logger from '../logger';

const log = Logger.create('utils:http');

const initInterceptors = instance => {
  // Request Interceptor
  instance.interceptors.request.use(requestConfig => {
    if (Config.get('debug.request')) {
      log('Request Configuration');
      log(requestConfig);
    }

    return requestConfig;
  }, error => {
    log('Error in Request');
    return Promise.reject(error);
  });

  // Response Interceptor
  instance.interceptors.response.use(responseConfig => {
    if (Config.get('debug.response')) {
      log('Response Configuration');
      log(responseConfig);
    }

    return responseConfig;
  }, error => {
    log('Error in Response');
    return Promise.reject(error);
  });
};

export default class HTTP {
  constructor() {
    const defaults = {
      headers: {
        'User-Agent': Config.get('userAgent')
      }
    };

    this.instance = axios.create(defaults);
    initInterceptors(this.instance);
  }

  async request(method, endpoint, options) {
    let config = {
      method,
      url: endpoint
    };

    config = _.merge(config, options);

    return await this.instance(config);
  }

  async get(endpoint, options = {}) {
    return await this.request('get', endpoint, options);
  }

  async post(endpoint, options = {}) {
    return await this.request('post', endpoint, options);
  }

  handleError(error) {
    if (error.response) {
      log('Error in Response');
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log('\n== Data ==\n', error.response.data);
      // log(error.response.status);
      // log(error.response.headers);
    }
    else if (error.request) {
      log('Error in Request');
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      log('\n== Message ==\n', error.request);
    }
    else {
      // Something happened in setting up the request that triggered an Error
      log('\n== Error ==\n', error.message);
    }
    log('\n== Configuration ==\n', error.config);
    log('\n== Error ==\n', error);
  }
}
