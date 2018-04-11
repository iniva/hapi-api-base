'use strict';

import routes from './routes';

export default {
    name: 'health',
    register: async(server, options) => {
        server.route(routes);
    }
};
