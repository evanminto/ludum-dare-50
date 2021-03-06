import { LitElement, css, html, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
import Deck from '../Deck';
const mapImageUrl = new URL('../images/map.png', import.meta.url);
const pinImageUrl = new URL('../images/pin.png', import.meta.url);

/**
 * @customElement map-app
 * @fires success
 */
export default class MapApp extends LitElement {
  static tagName = 'map-app';

  constructor() {
    super();

    const rows = new Deck([1, 2, 3, 4, 5]);
    const names = new Deck([
      'Rated Bar',
      'Ass Dungeon',
      'Plus Dumb',
      'The Dead Pigeon',
      'Burgerface',
      'Pound Town',
      'Bread & Gutter',
      'The Lie Berry',
      'The Broken Bottle',
      'Please Do Tell',
      'The Gulf',
      'Fraudulent Ministries',
      'Crumb Stain Bakery',
    ]);

    rows.shuffle({ avoidSameCard: false });
    names.shuffle({ avoidSameCard: false });

    this.pins = [
      {
        name: 'The Comrade',
        row: rows.draw(),
        col: 1 + Math.floor(Math.random() * 2),
        answer: true,
      },
      {
        name: names.draw(),
        row: rows.draw(),
        col: 1 + Math.floor(Math.random() * 2),
        answer: false,
      },
      {
        name: names.draw(),
        row: rows.draw(),
        col: 1 + Math.floor(Math.random() * 2),
        answer: false,
      },
      {
        name: names.draw(),
        row: rows.draw(),
        col: 1 + Math.floor(Math.random() * 2),
        answer: false,
      },
      {
        name: names.draw(),
        row: rows.draw(),
        col: 1 + Math.floor(Math.random() * 2),
        answer: false,
      },
    ];
  }

  render() {
    return html`
      ${this.pins.map(
        pin => html`
          <div
            class="pin"
            data-answer=${pin.answer ? '1' : '0'}
            style=${styleMap({
              '--row': pin.row,
              '--col': pin.col,
            })}
            @click=${this.handleClickPin}
          >
            ${pin.name}
          </div>
        `
      )}
    `;
  }

  handleClickPin(event) {
    if (event.target.dataset.answer === '1') {
      this.dispatchSuccess();
    } else {
      this.dispatchFailure();
    }
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
      background: url(${unsafeCSS(mapImageUrl)});
      background-size: cover;
      position: relative;
      display: grid;
      grid-template: repeat(4, 1fr) / repeat(4, 1fr);
      align-items: center;
      padding: 1em;
    }

    .pin {
      background: url('${unsafeCSS(pinImageUrl)}');
      background-size: 1.5em 1.5em;
      background-repeat: no-repeat;
      padding: 0.25em 1em 3em 2em;
      color: #fc0d1b;
      width: 100%;
      max-width: 12em;
      box-sizing: border-box;
      filter: drop-shadow(0.0625em 0.0625em 0px white)
        drop-shadow(0.0625em -0.0625em 0px white)
        drop-shadow(-0.0625em -0.0625em 0px white)
        drop-shadow(-0.0625em 0.0625em 0px white);
      grid-area: var(--row) / var(--col);
    }

    .pin[data-answer='1'] {
      z-index: 2;
    }

    img {
      image-rendering: pixelated;
    }
  `;
}
