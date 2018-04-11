'use strict';

export default class HealthController {
    static async get(request, h) {
        const healthData = {
            message: 'All good here, thanks for asking!'
        };

        return { data: healthData };
    }
}
