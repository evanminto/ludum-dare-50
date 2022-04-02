import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement map-app
 * @fires success
 */
export default class MapApp extends LitElement {
  static tagName = 'map-app';

  posts = [
    {
      handle: 'dril',
      content: 'Lorem ipsum',
      rtToComplete: true,
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {},
  ];

  render() {
    return html` Map

      <button type="button" @click=${this.handleSuccess}>Success</button>

      <button type="button" @click=${this.handleFailure}>Failure</button>`;
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
