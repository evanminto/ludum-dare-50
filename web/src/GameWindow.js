import { LitElement, css, html } from 'lit';
import script from './script.json';
import config from './config.json';

/**
 * @customElement game-window
 */
export default class GameWindow extends LitElement {
  static BATTERY_START = 25;

  static properties = {
    battery: Number,
    notifications: {
      type: Array,
      attribute: false,
    },
    phaseIndex: {
      type: Number,
      attribute: false,
    },
    appIndex: {
      type: Number,
      attribute: false,
    },
  };

  phases = [
    {
      apps: [
        html`<twitter-app></twitter-app>`,
        html`<map-app></map-app>`,
      ],
    },
  ]

  constructor() {
    super();

    this.battery = GameWindow.BATTERY_START;
    this.notifications = [];
    this.appIndex = 0;
    this.phaseIndex = 0;

    let seconds = 0;

    setInterval(() => {
      this.battery -= GameWindow.BATTERY_START / config.batteryMinutesDefault / 60;
      seconds += 1;
    }, 1000);
  }

  handleSuccess() {
    this.appIndex += 1;
  }

  render() {
    if (this.battery <= 0) {
      return html`<shutdown-screen></shutdown-screen>`;
    }

    return html`
      <nav-bar battery=${this.battery}></nav-bar>

      ${this.notifications.length > 0
        ? html`
          <div class="notifications-tray">
            ${this.notifications.map((n, index) => html`
              <notification-bubble
                @dismiss=${() => this.handleDismiss(index)}
              >
                ${n.text}
              </notification-bubble>
            `)}
          </div>
        `
        : ''}

      ${this.phaseIndex !== undefined && this.appIndex !== undefined
        ? html`
          <app-screen
            instructions=${this.currentApp.instructions}
            @back=${this.handleBack}
            @success=${this.handleSuccess}
          >
            ${this.phases[this.phaseIndex].apps[this.appIndex]}
          </app-screen>
        `
        : html`
          <div class="grid">
            ${this.apps.map(app => html`
              <app-icon name=${app.name} @click=${() => this.currentAppId = app.id}></app-icon>
            `)}
          </div>
        `}
    `;
  }

  get currentApp() {
    return this.phases[this.phaseIndex].apps[this.appIndex];
  }

  handleBack() {
    this.currentAppId = null;
  }

  handleDismiss(index) {
    const newNotifs = [...this.notifications];
    newNotifs.splice(index, 1);
    this.notifications = newNotifs;
  }

  static styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      background: black;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    app-screen {
      flex: 1 1 auto;
    }

    .notifications-tray {
      display: flex;
      flex-direction: column;
      gap: 0.25em;
      position: absolute;
      z-index: 1;
      left: 1em;
      right: 1em;
      top: 1em;
      width: calc(100% - 2em);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
      justify-items: center;
      gap: 1em;
      padding: 1em;
    }

    notification-bubble {
      box-shadow: 1px 1px 10px black;
    }
  `;
}

customElements.define('game-window', GameWindow);