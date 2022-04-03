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
      y: 5 + 80 * Math.random(),
    };
  },

  createAndAdd() {
    let point = this.create();

    // while (
    //   this.list
    //     .map(p => ({
    //       x: this.xDistance(p, point),
    //       y: this.yDistance(p, point),
    //     }))
    //     .some(({ x, y }) => y < 2 || x < 7)
    // ) {
    //   point = this.create();
    // }

    this.list.push(point);

    return point;
  },

  distance(p1, p2) {
    return Math.sqrt(((p1.x - p2.x) ^ 2) + ((p1.y - p2.y) ^ 2));
  },

  xDistance(p1, p2) {
    return Math.abs(p1.x - p2.x);
  },

  yDistance(p1, p2) {
    return Math.abs(p1.y - p2.y);
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
      answer: true,
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

  render() {
    return html`
      ${this.pins.map(
        pin => html`
          <div
            class="pin"
            data-answer=${pin.answer ? '1' : '0'}
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
    }

    .pin {
      position: absolute;
      z-index: 1;
      left: calc(var(--x) * 1%);
      top: calc(var(--y) * 1%);
      background: url('${unsafeCSS(pinImageUrl)}');
      background-size: 1.5em 1.5em;
      background-repeat: no-repeat;
      padding: 0.25em 1em 3em 2em;
      color: #fc0d1b;
      width: 100%;
      max-width: 12em;
      box-sizing: border-box;
      filter: drop-shadow(var(--shadow));
    }

    .pin[data-answer='1'] {
      z-index: 2;
    }

    img {
      image-rendering: pixelated;
    }
  `;
}
