'use strict';

export default {
    type: 'onPreHandler',
    method: (request, h) => {
        // your preHandler logic

        return h.continue;
    }
};
