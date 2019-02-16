import routes from './routes';

export default {
  name: 'health',
  register: async server => {
    server.route(routes);
  },
};
