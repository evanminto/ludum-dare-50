export default class App {
  #content = '';
  #notification = null;

  constructor({ content, notification }) {
    this.#content = content;
    this.#notification = notification;
  }

  get content() {
    return this.#content;
  }

  get notification() {
    return this.#notification;
  }
}
