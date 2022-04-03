export default class Notification {
  #content = '';
  #app = '';

  constructor({ content, app }) {
    this.#content = content;
    this.#app = app;
  }

  get content() {
    return this.#content;
  }

  get app() {
    return this.#app;
  }
}
