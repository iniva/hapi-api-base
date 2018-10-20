import { getEventFromHeaders } from './helpers';
import { EVENTS_AVAILABLE, builData } from './events';

const github = (headers, payload) => {
    const event = getEventFromHeaders(headers);

    if (!EVENTS_AVAILABLE.includes(event)) {
        throw new Error(`Event [${event}] is not available in Github webhooks`);
    }

    return builData(event, payload);
};

export default github;
