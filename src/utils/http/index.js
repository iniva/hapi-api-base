import got from 'got';

import Config from 'Config/index';

export default class HTTP {
    constructor(options = {}) {
        const defaultOptions = {
            headers: {
                'User-Agent': Config.get('userAgent')
            },
            responseType: 'json',
            json: true
        };
        const defaults = {
            handler: got.defaults.handler,
            options: got.mergeOptions(got.defaults.options, defaultOptions),
            mutableDefaults: got.defaults.mutableDefaults
        };
        const settings = got.mergeOptions(defaults, options);

        this.instance = got.create(settings);
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
