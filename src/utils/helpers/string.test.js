/* global describe it expect */

import { slug, capitalize, camelize } from './string';

describe('Helpers: String', () => {
    it('should return a slugged version of a string', () => {
        const resultText = slug('the title is clear');

        expect(resultText).toBe('the-title-is-clear');
    });

    it('should return a capitalized version of a string', () => {
        const resultText = capitalize('the title is clear');

        expect(resultText).toBe('The title is clear');
    });

    it('should return a camelized version of a string', () => {
        const resultText = camelize('the title is clear');

        expect(resultText).toBe('The Title Is Clear');
    });
});
