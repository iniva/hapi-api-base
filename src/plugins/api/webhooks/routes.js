import WebhooksController from './controller';

const prefix = 'webhooks';

export default [
  {
    method: 'GET',
    path: `/${prefix}`,
    options: {
      description: 'List available webhooks',
      handler: WebhooksController.get,
    },
  },

  {
    method: 'POST',
    path: `/${prefix}/{type}`,
    options: {
      description: 'Webhooks Trigger',
      handler: WebhooksController.trigger,
    },
  },
];
