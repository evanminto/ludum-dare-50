import { LitElement, css, html } from 'lit';

const ICON_TO_URL = {
  trash: new URL('../images/trash.png', import.meta.url),
  heart: new URL('../images/heart.png', import.meta.url),
};

/**
 * @customElement icon-button
 */
export default class IconButton extends LitElement {
  static tagName = 'icon-button';

  static properties = {
    icon: String,
    disabled: Boolean,
  };

  render() {
    return html`
      <button type="button" ?disabled=${this.disabled}>
        <img src=${ICON_TO_URL[this.icon]} />
      </button>
    `;
  }

  static styles = css`
    button {
      background: none;
      width: 2.5em;
      height: 2.5em;
      padding: 0;
      border: 0;
      font: inherit;
    }

    img {
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
    }
  `;
}
