import Boom from 'boom';

export default class WebhooksController {
    static async get(request) {
        const slackService = request.server['service::discovery'].get('slack');

        return {
            data: slackService.webhookList()
        };
    }

    static async github(request) {
        try {
            const { headers, payload } = request;
            const slackService = request.server['service::discovery'].get('slack');

            return await slackService
                .eventFromGithub(headers, payload)
                .send();
        } 
        catch (error) {
            return Boom.badRequest(error);
        }
    }
}
