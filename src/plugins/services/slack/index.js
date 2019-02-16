import SlackService from './service';

const name = 'slack-service';

export default {
  name,
  register: async (server, { mask, ...options }) => {
    const service = new SlackService(options);

    server.decorate('server', `${mask}slack`, service);
  },
};
