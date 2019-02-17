/* global describe it expect */

import HTTP from './index';
import Config from 'Config';

describe('Utils: HTTP', () => {
  it('should create an instance with defaults', () => {
    const http = new HTTP();

    expect(http).toBeInstanceOf(HTTP);
    expect(http.instance).toBeInstanceOf(Function);
    expect(http.instance.defaults.options).toHaveProperty(
      'headers',
      expect.objectContaining({
        'user-agent': expect.stringContaining(Config.get('userAgent')),
      }),
    );
  });

  it('should create an instance with custom settings', () => {
    const customAgent = 'Custom Agent';
    const customSettings = {
      headers: {
        'user-agent': customAgent,
      },
    };
    const http = new HTTP(customSettings);

    expect(http).toBeInstanceOf(HTTP);
    expect(http.instance).toBeInstanceOf(Function);
    expect(http.instance.defaults.options).toHaveProperty(
      'headers',
      expect.objectContaining({
        'user-agent': expect.stringContaining(customAgent),
      }),
    );
  });
});
