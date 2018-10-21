/* global describe it expect */

import github from './';

describe('Github Webhook', () => {
    it('should throw when passing invalid headers', () => {
        expect(() => {
            const data = github({}); // eslint-disable-line no-unused-vars
        }).toThrow('Event is not present in headers');
    });

    it('should throw when passing headers with unavailable event', () => {
        expect(() => {
            const data = github({ 'x-github-event': 'invalid' }); // eslint-disable-line no-unused-vars
        }).toThrow('Event [invalid] is not available in Github webhooks');
    });
});
