import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement wordle-app
 * @fires success
 * @fires failure
 */
export default class WordleApp extends LitElement {
  static tagName = 'wordle-app';

  render() {
    return html`
      <img src=${new URL('../images/curdle-UI.png', import.meta.url)} />
      <div class="buttons">
        <basic-button @click=${() => this.dispatchFailure()}>A</basic-button>
        <basic-button @click=${() => this.dispatchSuccess()}>B</basic-button>
        <basic-button @click=${() => this.dispatchFailure()}>C</basic-button>
      </div>
    `;
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      background: var(--color-black);
    }

    img {
      width: 100%;
      image-rendering: pixelated;
    }

    .buttons {
      display: flex;
      gap: 0.5em;
    }

    .buttons > * {
      flex: 1 1 auto;
    }

    basic-button {
      min-height: 3em;
    }
  `;
}
