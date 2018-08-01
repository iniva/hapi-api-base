import Boom from 'boom';

export default {
    type: 'onRequest',
    method: (request, h) => {
        if (request.method.match(/^(post|put)$/)) {
            if (request.headers['content-type'] !== 'application/json') {
                throw Boom.badRequest('"application/json" header is not present');
            }
        }

        return h.continue;
    }
};
