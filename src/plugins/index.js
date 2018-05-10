'use strict';

import Mongoose from 'hapi-nosql-mongoose';
import health from './api/health';

export default class Plugins {
    static async register(server, options) {
        // Database Plugins
        await server.register({
            plugin: Mongoose,
            options: options.mongodb
        });

        // API Plugins
        await server.register(health);
    }
}
