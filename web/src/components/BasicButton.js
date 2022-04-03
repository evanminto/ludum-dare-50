import { LitElement, css, html, unsafeCSS } from 'lit';
const imageUrl = new URL('../images/button.png', import.meta.url);

/**
 * @customElement basic-button
 * @fires success
 * @fires failure
 */
export default class BasicButton extends LitElement {
  static tagName = 'basic-button';

  render() {
    return html` <button type="button"><slot></slot></button> `;
  }

  static styles = css`
    button {
      border-image: url('${unsafeCSS(imageUrl)}') 5 8 7 8 fill stretch;
      font: inherit;
      background: none;
      width: 100%;
    }
  `;
}
