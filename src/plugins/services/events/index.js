import EventService from './service';
import listeners from './listeners';

const name = 'slack-service';

export default {
  name,
  register: async (server, { mask }) => {
    const service = new EventService();

    service.addSubscribers(listeners);
    server.decorate('server', `${mask}events`, service);
  },
};
