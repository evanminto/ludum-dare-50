import { LitElement, css, html } from 'lit';
import Deck from '../Deck';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement wordle-app
 * @fires success
 * @fires failure
 */
export default class WordleApp extends LitElement {
  static tagName = 'wordle-app';

  constructor() {
    super();

    this.buttons = Deck.randomize([
      html`<basic-button @click=${() => this.dispatchSuccess()}>
        A
      </basic-button>`,
      html`<basic-button @click=${() => this.dispatchFailure()}>
        C
      </basic-button>`,
      html`<basic-button @click=${() => this.dispatchFailure()}>
        E
      </basic-button>`,
    ]);
  }

  render() {
    return html`
      <img src=${new URL('../images/curdle-UI.png', import.meta.url)} />
      <div class="buttons">${this.buttons}</div>
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
      padding: 1em;
    }

    .buttons > * {
      flex: 1 1 auto;
    }

    basic-button {
      min-height: 3em;
    }
  `;
}
