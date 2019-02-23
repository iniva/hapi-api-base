import HealthController from './controller';

const API_PATH = '/health';

export default [
  {
    method: 'GET',
    path: API_PATH,
    options: {
      description: 'Health Check',
      handler: HealthController.get,
    },
  },
];
