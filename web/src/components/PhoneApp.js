import { LitElement, css, html } from 'lit';
import Deck from '../Deck';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement phone-app
 * @fires success
 * @fires failure
 */
export default class PhoneApp extends LitElement {
  static tagName = 'phone-app';

  static properties = {
    name: String,
    spam: Boolean,
  };

  constructor() {
    super();

    // Scamothy L. Ikeley
    // Carr Warren Tee
    // Stuart Lone
    // I. Tune Giffcard
    // Mom
    // Father.
    // Boo Boo Snookums
    // Job I Applied For!!!

    const caller = Deck.pickRandom([
      {
        name: 'Scamothy L. Ikeley',
        spam: true,
      },
      {
        name: 'Carr Warren Tee',
        spam: true,
      },
      {
        name: 'Cruise for You',
        spam: true,
      },
      {
        name: 'Free iTunes Gift Card',
        spam: true,
      },
      {
        name: 'Mom',
        spam: false,
      },
      {
        name: 'Father.',
        spam: false,
      },
      {
        name: 'Job I Applied For!!!',
        spam: false,
      },
    ]);

    this.name = caller.name;
    this.spam = caller.spam;

    this.buttons = Deck.randomize([
      this.renderButton(false),
      this.renderButton(true),
    ]);
  }

  renderButton(pickUp = true) {
    const url = pickUp
      ? new URL('../images/pick-up.png', import.meta.url)
      : new URL('../images/hang-up.png', import.meta.url);

    return html`
      <button
        type="button"
        @click=${event => this.handleClickButton(event, pickUp)}
      >
        <img src=${url} />
      </button>
    `;
  }

  render() {
    return html`
      <div class="inner">
        <div class="caller">
          <p>${this.name}</p>
        </div>
        <div class="buttons">${this.buttons}</div>
      </div>
    `;
  }

  handleClickButton(event, pickUp) {
    const { spam } = this;

    if ((pickUp && spam) || (!pickUp && !spam)) {
      return this.dispatchFailure();
    }

    return this.dispatchSuccess();
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      display: block;
      background: var(--color-black);
      color: var(--color-white);
      display: flex;
      flex-direction: column;
    }

    .inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      flex: 1 1 auto;
    }

    * {
      box-sizing: border-box;
      margin: 0;
    }

    .caller {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2em;
      text-align: center;
    }

    .buttons {
      display: flex;
      justify-content: center;
      gap: 2em;
      padding: 2em;
    }

    p {
      font-size: 4em;
    }

    button {
      background: none;
      border: none;
    }

    img {
      image-rendering: pixelated;
      font-size: 3em;
    }
  `;
}
