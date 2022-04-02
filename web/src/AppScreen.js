import { LitElement, css, html } from 'lit';

/**
 * @customElement app-screen
 */
export default class AppScreen extends LitElement {
  render() {
    return html`
      <button type="button" @click=${this.handleClickBack}>Back</button>

      <div>
        <slot></slot>
      </div>
    `;
  }

  handleClickBack() {
    this.dispatchEvent(new CustomEvent('back'));
  }

  static styles = css`
    :host {
      display: block;
      background: lightgray;
      padding: 1em;
    }
  `;
}

customElements.define('app-screen', AppScreen);