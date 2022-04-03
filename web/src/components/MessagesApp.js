import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement messages-app
 * @fires success
 * @fires failure
 */
export default class MessagesApp extends LitElement {
  static tagName = 'messages-app';

  messages = ['Lorem ipsum', 'Dolor sit amet', 'Foo bar'];
  answer = 'B';

  render() {
    return html`
      <div class="container">
        <ul class="messages-list">
          ${this.messages.map(
            message => html`<li class="message">${message}</li>`
          )}
        </ul>

        <div class="input">
          <basic-button @click=${this.handleClickButton}>A</basic-button>
          <basic-button @click=${this.handleClickButton}>B</basic-button>
          <basic-button @click=${this.handleClickButton}>C</basic-button>
        </div>
      </div>
    `;
  }

  handleClickButton(event) {
    if (event.target.textContent === this.answer) {
      this.dispatchSuccess();
    } else {
      this.dispatchFailure();
    }
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      display: block;
      background: lightgray;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .input {
      background: white;
      padding: 1em;
      display: flex;
      gap: 0.5em;
    }

    .input > * {
      flex: 1 1 0;
      max-width: none;
    }

    .messages-list {
      padding: 0;
      list-style: none;
      margin-top: 0;
      margin-bottom: 0;
      display: flex;
      flex-direction: column-reverse;
      gap: 0.25em;
      padding: 1em;
      margin-top: auto;
    }

    .message {
      background: black;
      color: white;
      padding: 0.5em;
      max-width: max-content;
    }
  `;
}
