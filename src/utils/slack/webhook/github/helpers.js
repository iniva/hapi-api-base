import * as events from './events';

const getEventFromHeaders = headers => {
    if (!Object.keys(headers).includes('x-github-event')) {
        throw new Error('Event is not present in headers');
    }

    return headers['x-github-event'];
};

export const buildData = (headers, payload) => {
    const event = getEventFromHeaders(headers);

    if (!Object(events).hasOwnProperty(event)) {
        throw new Error(`Event [${event}] is not supported`);
    }

    return events[event](payload);
};
