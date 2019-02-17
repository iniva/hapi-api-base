/* global beforeEach describe it expect */
import Logger from './index';
import { slug } from '../helpers/string';

describe('Utils: Logger', () => {
  beforeEach(() => {
    process.env.APP_NAME = 'Test App';
  });

  it('should return a new logger with default namespace if created without identifier', () => {
    const logger = Logger.create();
    const sluggedApp = slug(process.env.APP_NAME);

    expect(logger).toBeInstanceOf(Function);
    expect(logger.namespace).toBe(sluggedApp);
  });

  it('should return a new logger with custom namespace if created with identifier', () => {
    const logger = Logger.create('custom');
    const sluggedApp = slug(process.env.APP_NAME);

    expect(logger).toBeInstanceOf(Function);
    expect(logger.namespace).toBe(`${sluggedApp}:custom`);
  });
});
