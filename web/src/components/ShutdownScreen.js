import { LitElement, css, html } from 'lit';

/**
 * @customElement shutdown-screen
 */
export default class ShutdownScreen extends LitElement {
  static tagName = 'shutdown-screen';

  static properties = {
    dead: Boolean,
  };

  firstUpdated() {
    setTimeout(() => (this.dead = true), 4000);
  }

  render() {
    return html`
      <div class="inner" ?hidden=${this.dead}>
        <img src=${new URL('../images/shutdown-spin.png', import.meta.url)} />
        <p>Shutting down...</p>
      </div>
    `;
  }
  static styles = css`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    :host {
      display: block;
      background: black;
      min-height: 100%;
    }

    * {
      box-sizing: border-box;
    }

    .inner {
      color: white;
      text-align: center;
      padding: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex-direction: column;
      transition: opacity 250ms ease-in;
    }

    [hidden] {
      opacity: 0;
    }

    img {
      animation: spin 2s linear infinite;
      max-width: 100%;
    }
  `;
}
