export default class Memory {
  constructor() {
    this.cache = null;
  }

  async start() {
    this.cache = new Map();
  }

  async stop() {
    this.cache = null;
  }

  async has(key) {
    return this.cache.has(key);
  }

  async get(key) {
    return this.cache.get(key);
  }

  async set(key, value, ttl) { // eslint-disable-line no-unused-vars
    return this.cache.set(key, value);
  }

  async drop(key) {
    return this.cache.delete(key);
  }
}
