import Boom from 'boom';

export default class WebhooksController {
  static async get(request) {
    const slackService = request.server.discoveryService.get('slack');

    return {
      data: slackService.webhookList(),
    };
  }

  static async trigger(request) {
    try {
      const { headers, params, payload } = request;
      const slackService = request.server.discoveryService.get('slack');

      return await slackService
        .eventFrom(params.type, headers, payload)
        .send();
    } catch (error) {
      return Boom.badRequest(error);
    }
  }
}
