import { Dispatcher, factory } from 'slack-webhooks-handler';

export default class SlackService {
  constructor({ webhook }) {
    this.dispatcher = new Dispatcher(webhook);
  }

  static webhookList() {
    return [
      'github',
    ];
  }

  async send() {
    return this.dispatcher.send();
  }

  eventFrom(type, ...params) {
    const webhook = factory(type);
    const { attachments } = webhook(...params);

    this.dispatcher.withAttachments(attachments);

    return this;
  }
}
