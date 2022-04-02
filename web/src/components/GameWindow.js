import { LitElement, css, html } from 'lit';
import config from '../config.json';
import Phase from '../Phase';
import Deck from '../Deck';

/**
 * @customElement game-window
 */
export default class GameWindow extends LitElement {
  static tagName = 'game-window';

  static BATTERY_START = 25;

  static properties = {
    battery: Number,
    notifications: {
      type: Array,
      attribute: false,
    },
  };

  phases = new Deck([
    new Phase([
      {
        content: html`<twitter-app></twitter-app>`,
      },
      {
        content: html`<map-app></map-app>`,
      },
    ]),
  ]);

  constructor() {
    super();

    this.battery = GameWindow.BATTERY_START;
    this.notifications = [];

    let seconds = 0;

    setInterval(() => {
      this.battery -=
        GameWindow.BATTERY_START / config.batteryMinutesDefault / 60;
      seconds += 1;
    }, 1000);
  }

  discardApp() {
    this.discardedAppIndexes = [...this.discardedAppIndexes, this.appIndex];
  }

  handleSuccess() {
    const { appDeck } = this.phases.current;
    appDeck.discard();
    appDeck.shuffle();
    this.requestUpdate('phases');
  }

  handleFailure() {
    console.log('failure');
    const { appDeck } = this.phases.current;
    appDeck.shuffle();
    this.requestUpdate('phases');
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
              ${this.notifications.map(
                (n, index) => html`
                  <notification-bubble
                    @dismiss=${() => this.handleDismiss(index)}
                  >
                    ${n.text}
                  </notification-bubble>
                `
              )}
            </div>
          `
        : ''}
      ${this.phases.current && this.phases.current.appDeck.current
        ? html`
            <div
              class="app-container"
              @success=${this.handleSuccess}
              @failure=${this.handleFailure}
            >
              ${this.phases.current.appDeck.current.content}
            </div>
          `
        : html`
            <div class="grid">
              <app-icon name="Twitter"></app-icon>
              <app-icon name="Maps"></app-icon>
              <app-icon name="Instagram"></app-icon>
              <app-icon name="Notes"></app-icon>
              <app-icon name="Photos"></app-icon>
              <app-icon name="Camera"></app-icon>
              <app-icon name="Email"></app-icon>
              <app-icon name="Message"></app-icon>
              <app-icon name="Browser"></app-icon>
              <app-icon name="Wordle"></app-icon>
              <app-icon name="NextTrain"></app-icon>
              <app-icon name="TikTok"></app-icon>
            </div>
          `}
    `;
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

    * {
      box-sizing: border-box;
    }

    .app-container {
      flex: 1 1 auto;
    }

    .app-container > * {
      height: 100%;
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
