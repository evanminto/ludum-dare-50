import { LitElement, css, html, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
const mapImageUrl = new URL('../images/map.png', import.meta.url);
const pinImageUrl = new URL('../images/pin.png', import.meta.url);

const points = {
  list: [],

  create() {
    return {
      x: 5 + 40 * Math.random(),
      y: 5 + 70 * Math.random(),
    };
  },

  createAndAdd() {
    let point = this.create();

    while (this.list.map(p => this.distance(p, point)).some(d => d < 5)) {
      point = this.create();
    }

    this.list.push(point);

    return point;
  },

  distance(p1, p2) {
    return Math.sqrt(((p1.x - p2.x) ^ 2) + ((p1.y - p2.y) ^ 2));
  },
};

/**
 * @customElement map-app
 * @fires success
 */
export default class MapApp extends LitElement {
  static tagName = 'map-app';

  pins = [
    {
      name: 'The Comrade',
      ...points.createAndAdd(),
    },
    {
      name: 'Burgerface',
      ...points.createAndAdd(),
    },
    {
      name: 'The Dead Pigeon',
      ...points.createAndAdd(),
    },
    {
      name: 'The Broken Bottle',
      ...points.createAndAdd(),
    },
  ];

  answer = 'The Comrade';

  render() {
    return html`
      ${this.pins.map(
        pin => html`
          <div
            class="pin"
            style=${styleMap({
              '--x': pin.x,
              '--y': pin.y,
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
    if (event.target.innerText === this.answer) {
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
    }

    .pin {
      position: absolute;
      left: calc(var(--x) * 1%);
      top: calc(var(--y) * 1%);
      background: url('${unsafeCSS(pinImageUrl)}');
      background-repeat: no-repeat;
      padding: 0.25em 1em 3em 2em;
      color: #fc0d1b;
      width: 100%;
      max-width: 12em;
      box-sizing: border-box;
    }

    img {
      image-rendering: pixelated;
    }
  `;
}
