/* global describe it expect */
import { Dispatcher } from 'slack-webhooks-handler';

import SlackService from './service';

const configMock = {
  webhook: {
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    botName: 'Test Bot',
  },
};

describe('Services: Slack', () => {
  it('should throw when passing an invalid config', () => {
    expect(() => {
      const service = new SlackService({}); // eslint-disable-line no-unused-vars
    })
      .toThrowError('Slack Webhook URL is required');
  });

  it('should create the Slack service correctly', () => {
    const service = new SlackService(configMock);

    expect(service).toBeInstanceOf(SlackService);
    expect(service.dispatcher).toBeInstanceOf(Dispatcher);
  });

  it('should set the dispatcher text property', () => {
    const service = new SlackService(configMock);

    service.message();
    expect(service.dispatcher.text).toEqual('');

    service.message('a test message');
    expect(service.dispatcher.text).toEqual('a test message');
  });

  it('should set the dispatcher attachments property', () => {
    const service = new SlackService(configMock);

    service.attach();
    expect(service.dispatcher.attachments).toEqual([]);

    service.attach([1, 2]);
    expect(service.dispatcher.attachments).toEqual([1, 2]);
  });
});
