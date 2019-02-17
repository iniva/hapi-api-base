/* global describe it expect */
import Joi from 'joi';

import Validator from './index';

const schema = Joi.object().keys({
  field: Joi.string().required(),
});

describe('Utils: Validator', () => {
  it('"getter defaultOptions": should return an object with default options', () => {
    const options = Validator.defaultOptions;

    expect(options).toBeInstanceOf(Object);
    expect(Object.keys(options).length).toBeGreaterThan(1);
  });

  describe('validate()', () => {
    it('should fail when values are not present', () => {
      const { error } = Validator.validate({}, schema);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('child "field" fails because ["field" is required]');
    });

    it('should fail when receiving invalid values', () => {
      const { error } = Validator.validate({ field: 1234 }, schema);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('child "field" fails because ["field" must be a string]');
    });

    it('should work when receiving valid values', () => {
      const { value } = Validator.validate({ field: 'string' }, schema);

      expect(typeof value.field).toBe('string');
    });
  });

  describe('parseValidation()', () => {
    it('should return validation details', () => {
      const validation = Validator.validate({ field: 'string' }, schema);
      const parsed = Validator.parseValidation(validation);

      expect(parsed).toBeInstanceOf(Object);
      expect(Object.keys(parsed)).toEqual(['errors', 'value']);
    });

    it('should return "errors" key undefined when receiving valid data', () => {
      const validation = Validator.validate({ field: 'string' }, schema);
      const parsed = Validator.parseValidation(validation);

      expect(parsed.errors).toBeUndefined();
    });

    it('should return "errors" key with details when receiving invalid data', () => {
      const validation = Validator.validate({ field: 1234 }, schema);
      const parsed = Validator.parseValidation(validation);

      expect(parsed.errors).toContainEqual({ field: '"field" must be a string' });
    });
  });

  describe('toResponse()', () => {
    it('should return a Boom formatted error', () => {
      const validation = Validator.validate({ field: 1234 }, schema);
      const parsed = Validator.parseValidation(validation);
      const response = Validator.toResponse(parsed.errors);
      const { payload } = response.output;

      expect(response).toBeInstanceOf(Error);
      expect(response.isBoom).toBeTruthy();
      expect(payload.error).toBe('Bad Request');
      expect(payload.message).toBe('Validation Errors');
      expect(payload.statusCode).toBe(400); // eslint-disable-line no-magic-numbers
      expect(payload.errors).toBeInstanceOf(Array);
    });
  });
});
