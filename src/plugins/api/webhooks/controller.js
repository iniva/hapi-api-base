import Boom from 'boom';

import GithubWebhook from 'Utils/slack/webhooks/github';

export default class WebhooksController {
    static async get() {
        return {
            data: [
                'github'
            ]
        };
    }

    static async github(request) {
        const url = process.env.SLACK_WEBHOOK_URL || '';

        if (!url) {
            return Boom.badImplementation('Slack Webhook URL is required');
        }        

        try {
            const { headers, payload } = request;
            const webhook = new GithubWebhook(url, headers, payload);

            return await webhook.send();
        } 
        catch (error) {
            return Boom.badRequest(error);
        }
    }
}
