import EventEmitter from 'events';

export default class EventManager extends EventEmitter {
  addSubscribers(listeners) {
    for (const name in listeners) {
      const listener = new listeners[name]();

      this.on(listener.getEventName(), listener.getHandler);
    }
  }

  fire(event, args) {
    if (!this.eventNames().includes(event)) {
      throw new Error(`Event ${event} does not exist`);
    }

    this.emit(event, args);
  }
}
