import { LitElement, css, html } from 'lit';

/**
 * @customElement win-screen
 */
export default class WinScreen extends LitElement {
  static tagName = 'win-screen';

  render() {
    return html` <p>You did it!</p> `;
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
