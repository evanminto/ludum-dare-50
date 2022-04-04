import { LitElement, css, html } from 'lit';

const batteryImageUrl = new URL('../images/battery.png', import.meta.url);

/**
 * @customElement nav-bar
 */
export default class NavBar extends LitElement {
  static tagName = 'nav-bar';

  static properties = {
    battery: Number,
    time: String,
  };

  render() {
    return html`
      <div class="inner">
        <span class="time">${this.time}</span>

        <span class="battery ${this.battery < 5 ? 'battery--low' : ''}">
          ${this.battery > 0 ? html`${Math.ceil(this.battery)}%` : html`DEAD`}
          <img src=${batteryImageUrl} />
        </span>
      </div>
    `;
  }

  static styles = css`
    @keyframes pulse {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
      }
    }

    :host {
      display: block;
      width: 100%;
      background: var(--color-black);
      color: var(--color-white);
    }

    .inner {
      display: flex;
      justify-content: space-between;
      padding: 1em;
    }

    .battery {
      display: flex;
      gap: 0.25em;
      align-items: center;
      color: var(--color-red);
    }

    .battery--low {
      animation: pulse 400ms both;
      animation-iteration-count: infinite;
    }

    .battery > * {
      flex: 0 0 auto;
    }

    .battery img {
      width: 1em;
      height: 1em;
      image-rendering: pixelated;
    }
  `;
}
