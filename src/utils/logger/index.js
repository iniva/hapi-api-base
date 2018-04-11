'use strict';

import debug from 'debug';

export default class Logger {
    static create(identifier = '') {
        if (identifier !== '') {
            identifier = `:${identifier}`;
        }

        return debug(`${process.env.APP_NAME}${identifier}`);
    }
}
