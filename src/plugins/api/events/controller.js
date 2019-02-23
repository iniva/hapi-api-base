import Boom from 'boom';

export default class EventsController {
  static async post(request) {
    const { params: { event }, payload, server } = request;
    const { discoveryService } = server;
    const eventService = discoveryService.get('events');


    const args = {
      discoveryService,
      payload,
    };

    try {
      eventService.fire(event, args);
    } catch (error) {
      return Boom.badRequest(error.message, error);
    }

    return {
      data: {
        event,
        payload,
      },
    };
  }
}
