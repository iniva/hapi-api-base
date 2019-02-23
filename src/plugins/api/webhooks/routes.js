import WebhooksController from './controller';

const API_PATH = '/webhooks';

export default [
  {
    method: 'GET',
    path: API_PATH,
    options: {
      description: 'List available webhooks',
      handler: WebhooksController.get,
    },
  },

  {
    method: 'POST',
    path: `${API_PATH}/{type}`,
    options: {
      description: 'Webhooks Trigger',
      handler: WebhooksController.trigger,
    },
  },
];
