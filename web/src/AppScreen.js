import { LitElement, css, html } from 'lit';

/**
 * @customElement app-screen
 */
export default class AppScreen extends LitElement {
  static properties = {
    instructions: String,
  };

  render() {
    return html`
      ${this.instructions ? html`<p class="instructions">${this.instructions}</p>` : ''}

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
      position: relative;
    }

    .instructions {
      position: absolute;
      top: 3em;
      left: 50%;
      translate: -50%;
      background: black;
      color: white;
      padding: 0.25em;
    }
  `;
}

customElements.define('app-screen', AppScreen);