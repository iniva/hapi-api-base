'use strict';

// import mongodb from './database/mongodb';
import health from './api/health';

export default class Plugins {
    static async register(server, options) {
        // await server.register({
        //     plugin: mongodb,
        //     options: options.mongodb
        // });

        await server.register(health);
    }
}
