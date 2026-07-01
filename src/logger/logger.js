export default class Log {
  #timestamp;
  constructor() {
    this.#timestamp = new Date().toISOString();
  }

  get timestamp() {
    return this.#timestamp;
  }

  info(message) {
    console.log(`[${this.#timestamp}] INFO: ${message}`);
  }
}
