import { LitElement, css, html } from 'lit';
import dayjs from 'dayjs';
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
    case 'instagram':
      return html`<instagram-app></instagram-app>`;
    case 'wordle':
      return html`<wordle-app></wordle-app>`;
    case 'tiktok':
      return html`<tiktok-app></tiktok-app>`;
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
    seconds: Number,
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
    hideIntroMessage: {
      type: Boolean,
      attribute: false,
    },
    hideWinMessage: {
      type: Boolean,
      attribute: false,
    },
  };

  constructor() {
    super();

    this.seconds = 0;
    this.dayJs = dayjs('2022-01-01T16:20:00');
    this.battery = GameWindow.BATTERY_START;

    this.hideIntroMessage = false;
    this.hideWinMessage = true;

    this.phases = new Deck(
      phases.map(
        ({ apps }) =>
          new Phase(
            apps.map(
              ({ notification, notificationApp, app }) =>
                new App({
                  notification: new Notification({
                    content: notification,
                    app: notificationApp,
                  }),
                  content: renderApp(app),
                })
            )
          )
      )
    );
  }

  beginPlay() {
    setInterval(() => {
      this.increaseSeconds();
      this.decreaseBattery();
    }, 1000);

    /** @type {Phase} */
    this.currentPhase = this.phases.draw();

    /** @type {App} */
    const app = this.currentPhase.appDeck.draw();

    /** @type {Notification} */
    this.notification = app.notification;

    setTimeout(() => (this.currentApp = app), 1500 + 350);

    this.screenShakeAnimation = this.animate(
      [
        {
          transform: 'translate3d(2%, 0%, 0)',
        },
        {
          transform: 'translate3d(-2%, 0%, 0)',
        },
      ],
      {
        duration: 170,
        iterations: 2,
      }
    );
    this.screenShakeAnimation.cancel();

    this.redTintAnimation = this.animate(
      [
        {
          filter: 'none',
        },
        {
          filter:
            'contrast(50%) brightness(50%) sepia(100%) saturate(300%) hue-rotate(-29deg)',
        },
      ],
      {
        duration: 170 * 2,
      }
    );
    this.redTintAnimation.cancel();
  }

  increaseSeconds() {
    this.seconds += 1;
    this.dayJs = this.dayJs.add(1, 'second');
  }

  decreaseBattery() {
    this.battery -=
      GameWindow.BATTERY_START / config.batteryMinutesDefault / 60;
  }

  async handleSuccess() {
    this.playHideAppAnimation();
    const { currentPhase } = this;
    const nextApp = currentPhase.appDeck.draw();
    this.currentApp = null;

    if (nextApp) {
      this.notification = nextApp.notification;
      setTimeout(() => (this.currentApp = nextApp), 1500 + 350);
    } else {
      this.currentPhase = this.phases.draw();

      if (this.currentPhase === null) {
        this.win = true;
      }
    }
  }

  async handleFailure() {
    await Promise.all([
      this.playFailureAnimation(),
      this.playHideAppAnimation(),
    ]);
    const { appDeck } = this.currentPhase;
    appDeck.putBack(this.currentApp);
    appDeck.shuffle();
    this.currentApp = null;
    const nextApp = this.currentPhase.appDeck.draw();
    this.notification = null;

    setTimeout(() => {
      this.notification = nextApp.notification;
      setTimeout(() => (this.currentApp = nextApp), 1500 + 350);
    }, 250);
  }

  playFailureAnimation() {
    return Promise.all([
      new Promise(resolve => {
        this.screenShakeAnimation.addEventListener('finish', resolve, {
          once: true,
        });
        this.screenShakeAnimation.play();
      }),
      new Promise(resolve => {
        this.redTintAnimation.addEventListener('finish', resolve, {
          once: true,
        });
        this.redTintAnimation.play();
      }),
    ]);
  }

  playHideAppAnimation() {
    return new Promise(resolve => {
      this.hideAppAnimation.cancel();
      this.hideAppAnimation.addEventListener('finish', resolve, {
        once: true,
      });
      this.hideAppAnimation.play();
    });
  }

  firstUpdated() {
    const introMessage = this.renderRoot.querySelector(
      '.intro-message-wrapper'
    );

    this.introMessageShowAnimation = introMessage.animate(
      [
        {
          opacity: 0,
          transform: 'translate3d(0%, -25%, 0)',
        },
        {
          opacity: 1,
          transform: 'translate3d(0%, 0%, 0)',
        },
      ],
      {
        duration: 250,
        fill: 'forwards',
        id: 'intro-message-show',
      }
    );
    this.introMessageShowAnimation.cancel();

    this.introMessageHideAnimation = introMessage.animate(
      [
        {
          opacity: 1,
          transform: 'translate3d(0%, 0%, 0)',
        },
        {
          opacity: 0,
          transform: 'translate3d(0%, 25%, 0)',
        },
      ],
      {
        duration: 250,
        fill: 'forwards',
        id: 'intro-message-hide',
      }
    );
    this.introMessageHideAnimation.cancel();

    this.introMessageHideAnimation.addEventListener(
      'finish',
      () => (this.hideIntroMessage = true)
    );

    setTimeout(() => this.introMessageShowAnimation.play(), 2000);
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
              duration: 300,
              fill: 'forwards',
            }
          );

          this.trayShowAnimation.pause();
        }

        this.trayShowAnimation.cancel();
        setTimeout(() => {
          this.trayShowAnimation.addEventListener(
            'finish',
            () => (this.notification = null)
          );
          this.trayShowAnimation.play();
        }, 1500);
      }
    }

    if (
      changed.has('currentApp') &&
      this.currentApp &&
      !this.hideAppAnimation
    ) {
      this.hideAppAnimation = this.renderRoot
        .querySelector('.app-container')
        .animate(
          [
            {
              transform: 'translate3d(0%, 0%)',
            },
            {
              transform: 'translate3d(0%, 100%)',
            },
          ],
          {
            duration: 150,
          }
        );
      this.hideAppAnimation.cancel();
    }

    if (changed.has('win') && this.win) {
      this.hideWinMessage = false;
    }

    if (changed.has('hideWinMessage') && !this.hideWinMessage) {
      this.introMessageHideAnimation.cancel();
      this.introMessageShowAnimation.cancel();
      this.introMessageShowAnimation.play();
    }
  }

  renderHomeScreen() {
    return html`
      <div class="grid">
        <app-icon name="Shitbird"></app-icon>
        <app-icon name="Maps"></app-icon>
        <app-icon name="Instigator"></app-icon>
        <app-icon name="DysTop"></app-icon>
        <app-icon name="UnHinged"></app-icon>
        <app-icon name="Email"></app-icon>
        <app-icon name="HarassApp"></app-icon>
        <app-icon name="Curdle"></app-icon>
        <app-icon name="To-Do"></app-icon>
        <app-icon name="Browser"></app-icon>
        <app-icon name="YubNub"></app-icon>
      </div>
    `;
  }

  renderNotification() {
    const { notification } = this;

    return html`
      <div class="notifications-tray">
        <notification-bubble app=${notification.app}>
          ${notification.content}
        </notification-bubble>
      </div>
    `;
  }

  renderCurrentApp() {
    const { currentApp } = this;

    return html`
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

    if (!win && battery <= 0) {
      return html`<shutdown-screen></shutdown-screen>`;
    }

    return html`
      <nav-bar
        time=${this.dayJs.format('hh:mm')}
        battery=${this.battery}
      ></nav-bar>

      ${this.notification && !win ? this.renderNotification() : ''}
      ${this.currentApp && !win
        ? this.renderCurrentApp()
        : this.renderHomeScreen()}

      <div class="intro-message-wrapper">
        <div class="intro-message" ?hidden=${this.hideIntroMessage}>
          <div class="intro-message-inner">
            <img src=${new URL('../images/battery.png', import.meta.url)} />
            <p>
              Battery is dangerously low. Complete all tasks before it dies!
            </p>
          </div>
          <basic-button @click=${this.handleClickStart}>Start</basic-button>
        </div>

        <div class="win-message" ?hidden=${this.hideWinMessage}>
          <p>You did it! Now go find a charger.</p>
        </div>
      </div>
    `;
  }

  handleClickStart() {
    this.introMessageHideAnimation.play();
    setTimeout(() => this.beginPlay(), 1000);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: black;
      position: relative;
      display: flex;
      flex-direction: column;
      font-family: 'IBM VGA', monospace;
      overflow: hidden;
    }

    * {
      box-sizing: border-box;
    }

    .app-container {
      flex: 1 1 auto;
      overflow: hidden;
    }

    .app-container > * {
      position: relative;
      z-index: 0;
      transform: translate3d(0%, 0%, 0);

      height: 100%;
      max-height: 100%;
      overflow: hidden;
    }

    .notifications-tray {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.25em;
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: hsla(0, 0%, 0%, 0.5);
      padding: 1em;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(var(--size-app-grid-track), 1fr)
      );
      justify-items: center;
      gap: 1em;
      padding: 1em;
      color: var(--color-white);
      word-break: break-word;
    }

    notification-bubble {
      box-shadow: var(--shadow);
    }

    .intro-message-wrapper {
      opacity: 0;

      display: block;
      top: 0;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
    }

    .intro-message-wrapper > * {
      pointer-events: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: calc(100% - 2em);
    }

    .intro-message {
      background: var(--color-white);
      padding: 1em;
      box-shadow: var(--shadow);
    }

    .intro-message-inner {
      display: flex;
      gap: 1em;
      align-items: center;
    }

    .win-message {
      background: var(--color-white);
      padding: 1em;
      box-shadow: var(--shadow);
    }
  `;
}
