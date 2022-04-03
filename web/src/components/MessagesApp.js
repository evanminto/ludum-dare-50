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
      padding: 1em;
    }

    button {
      font: inherit;
    }
  `;
}
