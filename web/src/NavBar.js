import { LitElement, css, html } from 'lit';

/**
 * @customElement nav-bar
 */
export default class NavBar extends LitElement {
  static properties = {
    battery: Number,
  };

  render() {
    return html`
      <span>
        ${this.battery > 0 ? html`${Math.ceil(this.battery)}%` : html`DEAD`}
      </span>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 2em;
      background: white;
    }
  `;
}

customElements.define('nav-bar', NavBar);