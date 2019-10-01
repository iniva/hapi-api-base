/* global describe it expect */

import Base from './base';

describe('Event Listener', () => {
  it('should throw when receiving an invalid name', () => {
    expect(() => new Base())
      .toThrow();

    expect(() => new Base(undefined))
      .toThrow();

    expect(() => new Base(''))
      .toThrow();

    expect(() => new Base('name'))
      .toThrow();
  });

  it('should create a new instance', () => {
    const eventName = 'valid';
    const event = new Base(eventName);

    expect(event.name).toEqual(eventName);
    expect(event.getEventName()).toEqual(eventName);
  });
});
