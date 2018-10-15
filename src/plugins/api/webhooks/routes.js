import WebhooksController from './controller';

const prefix = 'webhooks';

export default [
    {
        method: 'GET',
        path: `/${prefix}`,
        options: {
            description: 'List available webhooks',
            handler: WebhooksController.get
        }
    },

    {
        method: 'POST',
        path: `/${prefix}/github`,
        options: {
            description: 'GitHub Webhook',
            handler: WebhooksController.github
        }
    }
];
