export default class HealthController {
  static async get(request) {
    return {
      data: {
        message: 'All good here, thanks for asking!',
        version: request.server.settings.app.version,
      },
    };
  }
}
