/* global describe it expect */

import Base from './base';

describe('Event Listener', () => {
  it('should throw when receiving an invalid name', () => {
    expect(() => {
      const event = new Base(); // eslint-disable-line no-unused-vars
    }).toThrow();

    expect(() => {
      const event = new Base(undefined); // eslint-disable-line no-unused-vars
    }).toThrow();

    expect(() => {
      const event = new Base(''); // eslint-disable-line no-unused-vars
    }).toThrow();

    expect(() => {
      const event = new Base('name'); // eslint-disable-line no-unused-vars
    }).toThrow();
  });

  it('should create a new instance', () => {
    const eventName = 'valid';
    const event = new Base(eventName);

    expect(event.name).toEqual(eventName);
    expect(event.getEventName()).toEqual(eventName);
  });
});
