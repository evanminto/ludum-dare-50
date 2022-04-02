import { LitElement, css, html } from 'lit';

/**
 * @customElement shutdown-screen
 */
export default class ShutdownScreen extends LitElement {
  static tagName = 'shutdown-screen';

  render() {
    return html` <p>Shutting down...</p> `;
  }
  static styles = css`
    :host {
      display: block;
      background: black;
      color: white;
      text-align: center;
      padding: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
}
