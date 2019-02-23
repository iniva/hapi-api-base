import routes from './routes';

export default {
  name: 'events',
  register: async server => {
    server.route(routes);
  },
};
