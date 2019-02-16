import onRequestEvent from './onRequestEvent';
import onPreHandlerEvent from './onPreHandlerEvent';

export default class Extensions {
  static register(server) {
    server.ext(onRequestEvent);
    server.ext(onPreHandlerEvent);
  }
}
