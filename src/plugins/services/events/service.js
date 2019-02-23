import EventEmitter from 'events';

export default class EventService extends EventEmitter {
  addSubscribers(listeners) {
    Object.values(listeners).forEach(ListenerFn => {
      const listener = new ListenerFn();

      this.on(listener.getEventName(), listener.getHandler);
    });
  }

  fire(event, args) {
    if (!this.eventNames().includes(event)) {
      throw new Error(`Event ${event} does not exist`);
    }

    this.emit(event, args);
  }
}
