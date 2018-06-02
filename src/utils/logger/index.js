'use strict';

import debug from 'debug';

import Helpers from '../helpers';

export default class Logger {
    static create(identifier = '') {
        if (identifier !== '') {
            identifier = `:${identifier}`;
        }

        const appName = Helpers.string().slug(process.env.APP_NAME);

        return debug(`${appName}${identifier}`);
    }
}
