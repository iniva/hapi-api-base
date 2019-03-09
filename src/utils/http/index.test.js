/* global describe it expect */
import HttpAgent from 'agentkeepalive';

import HTTP from './index';
import Config from 'Config';

const { HttpsAgent } = HttpAgent;

describe('Utils: HTTP', () => {
  it('should create an instance with defaults', () => {
    const http = new HTTP();
    const { options } = http.instance.defaults;

    expect(http).toBeInstanceOf(HTTP);
    expect(http.instance).toBeInstanceOf(Function);
    expect(options).toHaveProperty(
      'headers',
      expect.objectContaining({
        'user-agent': expect.stringContaining(Config.get('userAgent')),
      }),
    );
    expect(options.agent.http).toBeInstanceOf(HttpAgent);
    expect(options.agent.https).toBeInstanceOf(HttpsAgent);
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
