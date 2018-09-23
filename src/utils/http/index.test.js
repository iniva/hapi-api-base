/* global describe it expect */

import HTTP from './';
import Config from 'Config';

describe('Utils: HTTP', () => {
    it('should create an instance with defaults', () => {
        const http = new HTTP();

        expect(http).toBeInstanceOf(HTTP);
        expect(http.instance).toBeInstanceOf(Function);
        expect(http.instance.defaults).toHaveProperty(
            'headers',
            expect.objectContaining({
                'User-Agent': expect.stringContaining(Config.get('userAgent'))
            })
        ); 
    });
});
