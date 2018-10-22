import { IncomingWebhook } from '@slack/client';

export default class Webhook {
    constructor(options = {}) {
        if (!options.url) {
            throw new Error('Slack Webhook URL is required');
        }

        this.webhook = new IncomingWebhook(options.url);
        this.username = options.botName;
        this.text = '';
        this.attachments = [];
    }

    hasAttachments() {
        return !(this.attachments.length === 0);
    }

    withAttachments(attachments) {
        this.attachments = attachments;
    }

    async send() {
        if (!this.hasAttachments() && this.text === '') {
            throw new Error('Cannont send message. Either set a text or attachments.');
        }

        const message = {
            username: this.username,
            text: this.text,
            attachments: this.attachments
        };

        return this.webhook.send(message);
    }
}
