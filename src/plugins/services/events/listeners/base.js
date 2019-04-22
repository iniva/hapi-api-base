import Joi from '@hapi/joi';

export default class Base {
  constructor(name) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(5)
        .empty()
        .required(),
    });
    const validation = Joi.validate({ name }, schema);

    if (validation.error) {
      const [error] = validation.error.details;

      throw new Error(`Listener ${this.constructor.name} failed. ${error.message}`);
    }

    this.name = name;
  }

  getEventName() {
    return this.name;
  }

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  async getHandler(args) {
    // placeholder function
  }
}
