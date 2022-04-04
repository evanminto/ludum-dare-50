import { LitElement, css, html } from 'lit';
import Deck from '../Deck';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement messages-app
 * @fires success
 * @fires failure
 */
export default class MessagesApp extends LitElement {
  static tagName = 'messages-app';

  messages = [
    'hey are you going to that thing after work i dont wanna go alone',
  ];

  constructor() {
    super();

    this.buttons = Deck.randomize([
      html`<basic-button @click=${this.dispatchFailure}>
        Ueah im congrats
      </basic-button>`,
      html`<basic-button @click=${this.dispatchSuccess}>
        Yeah I’m coming
      </basic-button>`,
      html`<basic-button @click=${this.dispatchFailure}>
        Yas in cringing
      </basic-button>`,
    ]);
  }

  render() {
    return html`
      <div class="container">
        <ul class="messages-list">
          ${this.messages.map(
            message => html`<li class="message">${message}</li>`
          )}
        </ul>

        <div class="input">${this.buttons}</div>
      </div>
    `;
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      background: var(--color-white);
      display: flex;
      flex-direction: column-reverse;
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
      flex-direction: column;
      gap: 0.5em;
      border-top: 0.125em solid #ddd;
    }

    .input > * {
      flex: 1 1 auto;
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
      background: #ddd;
      color: black;
      padding: 0.5em;
      max-width: max-content;
    }
  `;
}
