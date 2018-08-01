import HealthController from './controller';

const prefix = 'health';

export default [
    {
        method: 'GET',
        path: `/${prefix}`,
        options: {
            description: 'Health Check',
            handler: HealthController.get
        }
    }
];
