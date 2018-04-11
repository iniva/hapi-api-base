'use strict';

import Hapi from 'hapi';
import blipp from 'blipp';
import Good from 'good';

import Config from './config';
// import { MONGODB } from 'Config/database';
import Plugins from './plugins';
import Extensions from 'Utils/extensions';
import Logger from 'Utils/logger';

const options = Config.get('server');
const server = Hapi.server(options);
const log = Logger.create();

const init = async() => {
    try {
        // Community Plugins
        await server.register(blipp);
        await server.register({
            plugin: Good,
            options: Config.get('logging')
        });

        // Our Plugins
        const pluginOptions = {
            // mongodb: MONGODB
        };

        await Plugins.register(server, pluginOptions);

        // Register Server Extensions
        Extensions.register(server);

        // Server Init
        await server.start();
        log(`${process.env.APP_NAME} running at ${server.info.uri}`);
    }
    catch (error) {
        log('An error happened while starting the server');
        log(error);
    }
};

(async() => {
    await init();
})();
