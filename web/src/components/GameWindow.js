import { LitElement, css, html } from 'lit';
import config from '../config.json';
import phases from '../config/phases.json';
import Phase from '../Phase';
import Deck from '../Deck';
import App from '../App';
import Notification from '../Notification';

/**
 * @param {String} name
 */
function renderApp(name) {
  switch (name) {
    case 'twitter':
      return html`<twitter-app></twitter-app>`;
    case 'maps':
      return html`<map-app></map-app>`;
    case 'messages':
      return html`<messages-app></messages-app>`;
    case 'email':
      return html`<email-app></email-app>`;
    case 'browser':
      return html`<browser-app></browser-app>`;
  }

  return '';
}

/**
 * @customElement game-window
 */
export default class GameWindow extends LitElement {
  static tagName = 'game-window';

  static BATTERY_START = 25;

  static properties = {
    battery: Number,
    win: Boolean,
    notification: {
      type: Notification,
      attribute: false,
    },
    phases: {
      type: Deck,
      attribute: false,
    },
    notificationAnimationComplete: Boolean,
    currentPhase: {
      type: Phase,
      attribute: false,
    },
    currentApp: {
      type: App,
      attribute: false,
    },
  };

  constructor() {
    super();

    this.battery = GameWindow.BATTERY_START;

    this.phases = new Deck(
      phases.map(
        ({ apps }) =>
          new Phase(
            apps.map(
              ({ notification, notificationApp, app }) =>
                new App({
                  notification: new Notification({
                    content: notification,
                  }),
                  content: renderApp(app),
                })
            )
          )
      )
    );

    this.start();

    setInterval(() => this.decreaseBattery(), 1000);
  }

  start() {
    /** @type {Phase} */
    this.currentPhase = this.phases.draw();

    /** @type {App} */
    this.currentApp = this.currentPhase.appDeck.draw();

    /** @type {Notification} */
    this.notification = this.currentApp.notification;
  }

  decreaseBattery() {
    this.battery -=
      GameWindow.BATTERY_START / config.batteryMinutesDefault / 60;
  }

  handleSuccess() {
    const { currentPhase } = this;
    const nextApp = currentPhase.appDeck.draw();

    if (nextApp) {
      this.notification = nextApp.notification;
      this.currentApp = nextApp;
    } else {
      this.currentPhase = this.phases.draw();

      if (this.currentPhase === null) {
        this.win = true;
      }
    }
  }

  handleFailure() {
    const { appDeck } = this.currentPhase;
    appDeck.putBack(this.currentApp);
    appDeck.shuffle();
    this.currentApp = this.currentPhase.appDeck.draw();
    this.notification = this.currentApp.notification;
  }

  updated(changed) {
    if (changed.has('notification') && this.notification) {
      const tray = this.renderRoot.querySelector('.notifications-tray');

      if (tray) {
        if (!this.trayShowAnimation) {
          this.trayShowAnimation = tray.animate(
            [
              {
                opacity: 1,
                visibility: 'visible',
              },
              {
                opacity: 0,
                visibility: 'hidden',
              },
            ],
            {
              duration: 1000,
              fill: 'forwards',
            }
          );

          this.trayShowAnimation.pause();
        }

        this.trayShowAnimation.cancel();
        setTimeout(() => this.trayShowAnimation.play(), 1000);
      }
    }
  }

  renderHomeScreen() {
    return html`
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
    `;
  }

  renderNotification() {
    const { notification } = this;

    return html`
      <div class="notifications-tray">
        <notification-bubble> ${notification.content} </notification-bubble>
      </div>
    `;
  }

  renderCurrentApp() {
    const { currentApp } = this;

    return html`
      ${this.notification ? this.renderNotification() : ''}

      <div
        class="app-container"
        @success=${this.handleSuccess}
        @failure=${this.handleFailure}
      >
        ${currentApp.content}
      </div>
    `;
  }

  render() {
    const { battery, win } = this;

    if (win) {
      return html`<win-screen></win-screen>`;
    }

    if (battery <= 0) {
      return html`<shutdown-screen></shutdown-screen>`;
    }

    return html`
      <nav-bar battery=${this.battery}></nav-bar>

      ${this.currentApp ? this.renderCurrentApp() : this.renderHomeScreen()}
    `;
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
      font-family: monospace;
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
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: darkgray;
      padding: 1em;
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
