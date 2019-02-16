import debug from 'debug';

import { slug } from '../helpers/string';

export default class Logger {
  static create(identifier = '') {
    const namespace = [];

    if (identifier !== '') {
      namespace.push(...[':', identifier]);
    }

    const appName = slug(process.env.APP_NAME);

    return debug(`${appName}${namespace.join('')}`);
  }
}
