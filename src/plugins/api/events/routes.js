import EventsController from './controller';

const API_PATH = '/events';

export default [
  {
    method: 'POST',
    path: `${API_PATH}/{event}`,
    options: {
      description: 'Events Manager',
      handler: EventsController.post,
    },
  },
];
