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

  render() {
    return html`
      Messages

      <button type="button" @click=${this.handleSuccess}>Success</button>

      <button type="button" @click=${this.handleFailure}>Failure</button>
    `;
  }

  handleSuccess() {
    this.dispatchSuccess();
  }

  handleFailure() {
    this.dispatchFailure();
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
  `;
}
