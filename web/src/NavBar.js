import { LitElement, css, html } from 'lit';

/**
 * @customElement nav-bar
 */
export default class NavBar extends LitElement {
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