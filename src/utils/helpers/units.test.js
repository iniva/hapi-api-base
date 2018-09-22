/* global describe it expect */

import { DAY, toMilliseconds } from './units';

describe('Helpers: Units', () => {
    it('should return a time in milliseconds', () => {
        const inMs = toMilliseconds(DAY);
        const expected = DAY * 1000;

        expect(inMs).toEqual(expected);
    });
});
