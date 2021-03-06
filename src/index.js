import Hapi from '@hapi/hapi';
import blipp from 'blipp';
// import Good from '@hapi/good';
import HapiPino from 'hapi-pino';

import Config from './config';
import MONGODB from 'Config/database/mongodb';
import SLACK from 'Config/slack';
import Plugins from './plugins';
import Extensions from 'Utils/extensions';
import Logger from 'Utils/logger';
// import Cache from 'Utils/cache';
import schemas from 'Plugins/database/mongodb/schemas';

const options = Config.get('server');
const server = Hapi.server(options);
const log = Logger.create();
// const cache = new Cache(Config.get('cache'));

const init = async () => {
  try {
    // Community Plugins
    await server.register(blipp);
    // await server.register({
    //   plugin: Good,
    //   options: Config.get('logging.good'),
    // });
    await server.register({
      plugin: HapiPino,
      options: Config.get('logging.pino'),
    });

    // Our Plugins
    // await cache.start();

    const pluginOptions = {
      mongodb: {
        ...MONGODB,
        logger: Logger.create('plugins:database:mongodb'),
        schemas,
      },
      services: {
        ...Config.get('services'),
        slack: SLACK,
      },
    };

    await Plugins.register(server, pluginOptions);

    // Register Server Extensions
    Extensions.register(server);

    // Server Init
    await server.start();
    log(`${process.env.APP_NAME} ${Config.get('version')} running at ${server.info.uri}`);
  } catch (error) {
    log(`There was an error while starting the server: ${error.message}`);
    log(error);
  }
};

process.on('unhandledRejection', err => {
  log('An Unhandled Rejection occurred.');
  log(err);
});

(async () => {
  await init();
})();
