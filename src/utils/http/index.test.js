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

    it('should create an instance with custom settings', () => {
        const customAgent = 'Custom Agent';
        const customSettings = {
            headers: {
                'User-Agent': customAgent
            }
        };
        const http = new HTTP(customSettings);

        expect(http).toBeInstanceOf(HTTP);
        expect(http.instance).toBeInstanceOf(Function);
        expect(http.instance.defaults).toHaveProperty(
            'headers',
            expect.objectContaining({
                'User-Agent': expect.stringContaining(customAgent)
            })
        );
    });
});
