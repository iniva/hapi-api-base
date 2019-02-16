import routes from './routes';

export default {
  name: 'webhooks',
  register: async server => {
    server.route(routes);
  },
};
