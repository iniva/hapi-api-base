'use strict';

export default class HealthController {
    static async get(request, h) {
        return {
            data: {
                message: 'All good here, thanks for asking!'
            }
        };
    }
}
