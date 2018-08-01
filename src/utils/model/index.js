/**
 * Model
 * This is the base for DTO files.
 * Maybe "Model" is not the best name for it but ¯\_(ツ)_/¯
 */
import Joi from 'joi';

export default class Model {
    constructor(data, schema) {
        if (!schema.isJoi) {
            throw new Error('The schema passed is not a valid Joi object');
        }

        this.data = data;
        this.schema = schema;
    }

    validate(options = {}) {
        return Joi.validate(this.data, this.schema, options);
    }

    get() {
        return this.data;
    }
}
