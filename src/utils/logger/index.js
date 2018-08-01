import debug from 'debug';

import { slug } from '../helpers/string';

export default class Logger {
    static create(identifier = '') {
        if (identifier !== '') {
            identifier = `:${identifier}`;
        }

        const appName = slug(process.env.APP_NAME);

        return debug(`${appName}${identifier}`);
    }
}
