// Inspired by https://github.com/asilluron/hapi-mongoose
'use strict';

import Logger from 'Utils/logger';
import Mongoose from 'Utils/database/mongoose';
import schemas from './schemas';

const log = Logger.create('plugins:database:mongodb');
const pluginName = 'mongodb';

export default {
    name: pluginName,
    register: async(server, options) => {
        const connector = new Mongoose(options);

        await new Promise((resolve, reject) => {
            connector.on('ready', () => {
                connector.setModels(schemas);

                // TODO: analyse if these are necessary
                // ------------
                server.expose('mongoose', connector.mongoose);
                server.expose('connection', connector.connection);
                // ------------

                server.decorate('server', 'mongodb:connector', connector);

                resolve();
            });
        });

        connector
            .on('close', message => {
                log(message);
            })
            .on('error', error => {
                log(`Database error: ${error.message}`);
                log(error);
            });
    }
};
