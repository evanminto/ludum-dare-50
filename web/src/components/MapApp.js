import { LitElement, css, html, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
const mapImageUrl = new URL('../images/map.png', import.meta.url);
const pinImageUrl = new URL('../images/pin.png', import.meta.url);

/**
 * @customElement map-app
 * @fires success
 */
export default class MapApp extends LitElement {
  static tagName = 'map-app';

  pins = [
    {
      name: 'A',
      x: 15 + 70 * Math.random(),
      y: 15 + 70 * Math.random(),
    },
    {
      name: 'B',
      x: 15 + 70 * Math.random(),
      y: 15 + 70 * Math.random(),
    },
    {
      name: 'C',
      x: 15 + 70 * Math.random(),
      y: 15 + 70 * Math.random(),
    },
    {
      name: 'D',
      x: 15 + 70 * Math.random(),
      y: 15 + 70 * Math.random(),
    },
  ];

  answer = 'B';

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
      padding: 0.25em 1em 3em 2.5em;
      color: #fc0d1b;
    }
  `;
}
