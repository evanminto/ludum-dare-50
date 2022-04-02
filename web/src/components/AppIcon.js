import { LitElement, css, html } from 'lit';

/**
 * @customElement app-icon
 */
export default class AppIcon extends LitElement {
  static tagName = 'app-icon';

  static properties = {
    name: String,
  };

  render() {
    return html`
      <div class="icon"></div>
      <p>${this.name}</p>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
    }

    .icon {
      display: block;
      width: 5em;
      height: 5em;
      background: white;
      border-radius: 1.5em;
    }
  `;
}
