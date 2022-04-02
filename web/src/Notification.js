export default class Notification {
  #content = '';

  constructor({ content }) {
    this.#content = content;
  }

  get content() {
    return this.#content;
  }
}
