import { Dispatcher, factory } from 'slack-webhooks-handler';

export default class SlackService {
  constructor({ webhook }) {
    this.dispatcher = new Dispatcher(webhook);
    this.webhooks = [
      'github',
    ];
  }

  webhookList() {
    return this.webhooks;
  }

  message(message = '') {
    this.dispatcher.text = message;

    return this;
  }

  attach(attachments = []) {
    this.dispatcher.withAttachments(attachments);

    return this;
  }

  async send() {
    return this.dispatcher.send();
  }

  eventFrom(type, ...params) {
    const webhook = factory(type);
    const { attachments } = webhook(...params);

    this.attach(attachments);

    return this;
  }
}
