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

  messages = [];

  constructor() {
    super();

    const { message, buttons } = Deck.randomize([
      {
        message:
          'hey are you going to that thing after work i dont wanna go alone',
        buttons: () => {
          return [
            html`<basic-button @click=${this.dispatchFailure}>
              Ueah im congrats
            </basic-button>`,
            html`<basic-button @click=${this.dispatchSuccess}>
              Yeah I’m coming
            </basic-button>`,
            html`<basic-button @click=${this.dispatchFailure}>
              Yas in cringing
            </basic-button>`,
          ];
        },
      },
      {
        message: 'how are you getting to the work party',
        buttons: () => {
          return [
            html`<basic-button @click=${this.dispatchSuccess}>
              Don’t know yet
            </basic-button>`,
            html`<basic-button @click=${this.dispatchFailure}>
              Done know yeet
            </basic-button>`,
            html`<basic-button @click=${this.dispatchFailure}>
              Dont none yet
            </basic-button>`,
          ];
        },
      },
      {
        message:
          'how far away are you??? i’m too shy and the bartender is talking to me',
        buttons: () => {
          return [
            html`<basic-button @click=${this.dispatchSuccess}>
              order a beer, coward
            </basic-button>`,
            html`<basic-button @click=${this.dispatchFailure}>
              odd her a beer, conehead
            </basic-button>`,
            html`<basic-button @click=${this.dispatchFailure}>
              older a bee, corning
            </basic-button>`,
          ];
        },
      },
    ])[0];

    this.buttons = Deck.randomize(buttons());
    this.messages = [message];
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
