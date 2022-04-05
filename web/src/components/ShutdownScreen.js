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
    setTimeout(() => {
      this.dead = true;
    }, 4000);
  }

  render() {
    return html`
      <div class="inner">
        <img
          src=${new URL('../images/shutdown-spin.png', import.meta.url)}
          ?hidden=${this.dead}
        />
        <p ?hidden=${this.dead}>Shutting down...</p>
        <p ?hidden=${!this.dead}>Refresh the page to start over</p>
      </div>
    `;
  }
  static styles = css`
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(-360deg);
      }
    }

    :host {
      display: block;
      background: black;
      min-height: 100%;
    }

    * {
      box-sizing: border-box;
      transition: opacity 250ms ease-in;
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
    }

    [hidden] {
      opacity: 0;
    }

    img {
      animation: spin 1s linear infinite;
      max-width: 100%;
    }
  `;
}
