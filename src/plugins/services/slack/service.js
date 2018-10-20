import Webhook from 'Utils/slack/webhook';
import github from 'Utils/slack/webhooks/github';

export default class SlackService {
    constructor({ webhook }) {
        this.webhook = new Webhook(webhook);
    }

    webhookList() {
        return [
            'github'
        ];
    }

    async send() {
        return await this.webhook.send();
    }

    eventFromGithub(headers, payload) {
        const { attachments } = github(headers, payload);

        this.webhook.withAttachments(attachments);

        return this;
    }
}
