// Database Plugin
import Mongoose from 'hapi-nosql-mongoose';

// Services Plugins
import discoveryService from './services/discovery';
import slackService from './services/slack';
import eventsService from './services/events';
// API Plugins
import health from './api/health';
import webhooks from './api/webhooks';
import events from './api/events';

export default class Plugins {
  static async register(server, options) {
    // Database Plugins
    await server.register({
      plugin: Mongoose,
      options: options.mongodb,
    });

    // Services Plugins
    await server.register([
      {
        plugin: discoveryService,
        options: {
          mask: options.services.mask,
        },
      },
      {
        plugin: slackService,
        options: {
          mask: options.services.mask,
          ...options.services.slack,
        },
      },
      {
        plugin: eventsService,
        options: {
          mask: options.services.mask,
        },
      },
    ]);

    // API Plugins
    await server.register([
      health,
      webhooks,
      events,
    ]);
  }
}
