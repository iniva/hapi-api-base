import Joi from 'joi';
import Boom from 'boom';

const DEFAULT_OPTIONS = {
  abortEarly: false,
  allowUnknown: true,
  convert: false,
};

export default class Validator {
  static get defaultOptions() {
    return DEFAULT_OPTIONS;
  }

  static validate(values, schema, options = {}) {
    const fullOptions = Object.assign(DEFAULT_OPTIONS, options);

    return Joi.validate(values, schema, fullOptions);
  }

  static parseValidation({ error, value }) {
    let errors;

    if (error) {
      errors = error.details.map(err => {
        const detail = {};

        detail[err.path] = err.message;

        return detail;
      });
    }

    return {
      errors,
      value,
    };
  }

  static toResponse(errors) {
    const error = Boom.badRequest('Validation Errors', errors);

    error.output.payload.errors = error.data;

    return error;
  }
}
