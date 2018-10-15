import { IncomingWebhook } from '@slack/client';

export default class Webhook {
    constructor(url) {
        if (!url) {
            throw new Error('Slack Webhook URL is required');
        }

        this.webhook = new IncomingWebhook(url);
        this.data = null;
    }

    async send() {
        return this.webhook.send(this.data);
    }
}
