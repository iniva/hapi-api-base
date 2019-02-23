import Base from './base';

const NAME = 'exampleEvent';

export default class ExampleEvent extends Base {
  constructor() {
    super(NAME);
  }

  async getHandler(args) { // eslint-disable-line class-methods-use-this, no-unused-vars
    // do stuff
  }
}
