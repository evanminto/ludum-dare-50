import { LitElement, css, html } from 'lit';
import config from '../config.json';
import Phase from '../Phase';
import Deck from '../Deck';
import App from '../App';
import Notification from '../Notification';

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

    /** @type {Notification} */
    this.notification = null;

    this.phases = new Deck([
      new Phase([
        new App({
          notification: new Notification({ content: 'How far away are you?' }),
          content: html`<twitter-app></twitter-app>`,
        }),
        new App({
          notification: new Notification({
            content: "The bar is called Goldie's",
          }),
          content: html`<map-app></map-app>`,
        }),
        new App({
          notification: new Notification({
            content: "Hey, I know you're going home but quick question",
          }),
          content: html`<messages-app></messages-app>`,
        }),
      ]),
    ]);

    /** @type {Phase} */
    this.currentPhase = this.phases.draw();

    /** @type {App} */
    this.currentApp = this.currentPhase.appDeck.draw();

    setInterval(() => this.decreaseBattery(), 1000);
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
    this.currentApp = null;
  }

  updated(changed) {}

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
    @keyframes notif-disappear {
      0% {
        opacity: 1;
      }

      99% {
        opacity: 0;
        visibility: visible;
      }

      100% {
        visibility: hidden;
      }
    }

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

      animation: notif-disappear 300ms ease-in-out 2s;
      animation-fill-mode: forwards;
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
