import got from 'got';

import Config from 'Config/index';

export default class HTTP {
    constructor(options = {}) {
        const defaultOptions = {
            headers: {
                'user-agent': Config.get('userAgent')
            },
            responseType: 'json',
            json: true
        };
        const fullOptions = got.mergeOptions(defaultOptions, options);
        const defaults = {
            handler: got.defaults.handler,
            options: got.mergeOptions(got.defaults.options, fullOptions),
            mutableDefaults: got.defaults.mutableDefaults
        };

        this.instance = got.create(defaults);
    }

    async request(method, endpoint, options) {
        const config = got.mergeOptions({ method }, options);

        return await this.instance(endpoint, config);
    }

    async get(endpoint, options = {}) {
        return await this.request('get', endpoint, options);
    }

    async post(endpoint, options = {}) {
        return await this.request('post', endpoint, options);
    }
}
