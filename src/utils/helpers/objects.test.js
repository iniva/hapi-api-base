/* global describe it expect */

import { hasOwnProperty, clean } from './objects';

describe('Object Helpers:', () => {
  describe('hasOwnProperty:', () => {
    it('should return false when the property does not exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      };

      expect(hasOwnProperty(object, 'age')).toBeFalsy();
    });

    it('should return true when the property exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      };

      expect(hasOwnProperty(object, 'lastName')).toBeTruthy();
    });
  });

  describe('clean', () => {
    it('should return given object without invalid values', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
        age: null,
        address: undefined,
        test: false,
      };

      expect(clean(object)).not.toHaveProperty('age');
      expect(clean(object)).not.toHaveProperty('address');
      expect(clean(object)).not.toHaveProperty('test');
    });

    it('should return given object without invalid values according to the custom guard', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
        age: null,
        address: undefined,
        test: false,
      };
      const customGuard = (obj, key) => (
        obj[key] !== null && obj[key] !== undefined
      );

      expect(clean(object, customGuard)).not.toHaveProperty('age');
      expect(clean(object, customGuard)).not.toHaveProperty('address');
      expect(clean(object, customGuard)).toHaveProperty('test');
    });
  });
});
