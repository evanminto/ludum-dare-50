import { LitElement, css, html } from 'lit';
import { ref, createRef } from 'lit/directives/ref';
import dayjs from 'dayjs';
import phases from '../config/phases.json';
import Phase from '../Phase';
import Deck from '../Deck';
import App from '../App';
import Notification from '../Notification';

const BATTERY_START = 15;
const BATTERY_NG_PLUS = 5;
const BATTERY_PER_SECOND = 0.2;

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
    case 'phone':
      return html`<phone-app></phone-app>`;
    case 'todo':
      return html`<todo-app></todo-app>`;
  }

  return '';
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const keyframes = {
  screenShake: [
    {
      transform: 'rotate(1deg) translate3d(2%, 0%, 0)',
    },
    {
      transform: 'rotate(-1deg) translate3d(-2%, 0%, 0)',
    },
  ],
  redTint: [
    {
      filter: 'none',
    },
    {
      filter:
        'contrast(50%) brightness(50%) sepia(100%) saturate(300%) hue-rotate(-29deg)',
    },
  ],
  greenTint: [
    {
      filter: 'none',
    },
    {
      filter:
        'contrast(50%) brightness(50%) sepia(100%) saturate(300%) hue-rotate(59deg)',
      offset: 0.25,
    },
    {
      filter:
        'contrast(50%) brightness(50%) sepia(100%) saturate(300%) hue-rotate(59deg)',
    },
  ],
};

const winMessages = new Deck([
  'Desperately you plug your phone into a mysterious ceiling outlet in the subway station. People are eyeing you, jealous of your ingenuity.',
  'You stop at some artisanal bean dungeon of a coffee shop. You buy one (1) scone to use their charger.',
  'A hipster carrying a solar panel offers to plug you in. As you charge, he offers you Xanax and starts to tell you about his cult.',
]);

winMessages.shuffle();

/**
 * @customElement game-window
 */
export default class GameWindow extends LitElement {
  static tagName = 'game-window';

  static properties = {
    playing: Boolean,
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
    hidePopup: {
      type: Boolean,
      attribute: false,
    },
    winMessage: String,
  };

  /** @type {import('lit/directives/ref').Ref<import('./AudioPlayer').default>} */
  audioRef = createRef();

  constructor() {
    super();

    this.playing = false;

    this.seconds = 0;
    this.dayJs = dayjs('2022-01-01T16:20:00');
    this.battery = BATTERY_START;

    this.startNewGame();

    this.addEventListener('click', () => (this.playing = true));
  }

  beginPlay() {
    setInterval(() => {
      if (!this.win) {
        this.increaseSeconds();
        this.decreaseBattery();
      }
    }, 1000);

    this.beginPlayCore();

    this.screenShakeAnimation = this.animate(keyframes.screenShake, {
      duration: 170,
      iterations: 2,
    });
    this.screenShakeAnimation.cancel();

    this.redTintAnimation = this.animate(keyframes.redTint, {
      duration: 170 * 2,
    });
    this.redTintAnimation.cancel();

    this.greenTintAnimation = this.animate(keyframes.greenTint, {
      duration: 400,
    });
    this.greenTintAnimation.cancel();
  }

  beginPlayCore() {
    /** @type {Phase} */
    this.currentPhase = this.phases.draw();

    /** @type {App} */
    const app = this.currentPhase.appDeck.draw();

    /** @type {Notification} */
    this.notification = app.notification;

    setTimeout(() => (this.currentApp = app), 1200 + 350);
  }

  increaseSeconds() {
    this.seconds += 1;
    this.dayJs = this.dayJs.add(1, 'second');
  }

  decreaseBattery() {
    if (this.battery <= 0) {
      return;
    }

    this.battery -= BATTERY_PER_SECOND;
  }

  async handleSuccess() {
    this.playSound('success');
    this.greenTintAnimation.play();
    await wait(400);
    const { currentPhase } = this;
    const nextApp = currentPhase.appDeck.draw();
    this.currentApp = null;
    await wait(400);

    if (nextApp) {
      this.notification = nextApp.notification;
      setTimeout(() => (this.currentApp = nextApp), 1200 + 350);
    } else {
      this.currentPhase = this.phases.draw();

      if (this.currentPhase === null) {
        setTimeout(() => {
          this.win = true;
          this.winMessage = winMessages.toArray()[0];
          winMessages.shuffle();
          this.hidePopup = false;
          this.hideIntroMessage = true;
          this.hideWinMessage = false;
          this.battery += BATTERY_NG_PLUS;
          this.playSound('win');
        }, 500);
      }
    }
  }

  async handleFailure() {
    this.playSound('failure');
    await this.playFailureAnimation();
    // await this.playHideAppAnimation();
    const { appDeck } = this.currentPhase;
    appDeck.putBack(this.currentApp);
    appDeck.shuffle();
    this.currentApp = null;
    const nextApp = this.currentPhase.appDeck.draw();
    this.notification = null;

    setTimeout(() => {
      this.notification = nextApp.notification;
      setTimeout(() => (this.currentApp = nextApp), 1200 + 350);
    }, 250);
  }

  playFailureAnimation() {
    this.screenShakeAnimation.play();
    this.redTintAnimation.play();

    return Promise.all([
      this.screenShakeAnimation.finished,
      this.redTintAnimation.finished,
    ]);
  }

  playSound() {
    return this.audioRef.value && this.audioRef.value.playSound(...arguments);
  }

  playHideAppAnimation() {
    this.hideAppAnimation.play();

    return this.hideAppAnimation.finished;
  }

  startNewGame() {
    this.win = false;

    this.hideIntroMessage = true;
    this.hideWinMessage = true;
    this.hidePopup = true;

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

    this.phases.shuffle({ avoidSameCard: false });
  }

  updated(changed) {
    if (changed.has('playing') && this.playing) {
      setTimeout(() => {
        this.hideIntroMessage = false;
        this.hidePopup = false;
        this.playSound('intro');
      }, 500);
    }

    if (changed.has('notification') && this.notification) {
      if (this.notification.app === 'Phone') {
        this.playSound('ringtone', { loop: true });
      } else {
        this.playSound('notification');
      }

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

          this.trayShowAnimation.cancel();
        }

        this.trayShowAnimation.cancel();
        setTimeout(() => {
          this.trayShowAnimation.addEventListener(
            'finish',
            () => (this.notification = null)
          );
          this.trayShowAnimation.play();
        }, 1200);
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
              transform: 'translate3d(0%, 0%, 0)',
            },
            {
              transform: 'translate3d(0%, 100%, 0)',
            },
          ],
          {
            duration: 150,
          }
        );
      this.hideAppAnimation.cancel();
    }

    if (changed.has('battery') && this.battery <= 0 && !this.win) {
      this.playSound('shutdown');
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
        <app-icon name="Phone"></app-icon>
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
        @tap=${this.handleTap}
      >
        ${currentApp.content}
      </div>
    `;
  }

  renderAudio() {
    return html` <audio-player ${ref(this.audioRef)}></audio-player> `;
  }

  handleTap() {
    this.playSound('click');
  }

  render() {
    const { playing, battery, win } = this;

    if (!playing) {
      return html`
        <div class="click-to-play">
          <p>Click to play</p>
          <p>(Best played on a modern mobile browser)</p>
        </div>
      `;
    }

    return html`
      ${!win && battery <= 0
        ? html`<shutdown-screen></shutdown-screen>`
        : html`
            <nav-bar
              time=${this.dayJs.format('hh:mm')}
              battery=${this.battery}
            ></nav-bar>

            ${this.notification && !win ? this.renderNotification() : ''}
            ${this.currentApp && !win
              ? this.renderCurrentApp()
              : this.renderHomeScreen()}

            <div class="intro-message-wrapper" ?hidden=${this.hidePopup}>
              <div class="intro-message" ?hidden=${this.hideIntroMessage}>
                <div class="intro-message-inner">
                  <img
                    src=${new URL('../images/battery.png', import.meta.url)}
                  />
                  <p>
                    Battery is dangerously low. Complete all tasks before it
                    dies!
                  </p>
                </div>
                <basic-button @click=${this.handleClickStart}
                  >Start</basic-button
                >
              </div>

              <div class="win-message" ?hidden=${this.hideWinMessage}>
                <p>${this.winMessage}</p>
                <p>Success! You gain ${BATTERY_NG_PLUS}% battery!</p>

                <basic-button
                  @click=${() => {
                    this.startNewGame();
                    this.beginPlayCore();
                  }}
                  >Keep Going</basic-button
                >
              </div>
            </div>
          `}
      ${this.renderAudio()}
    `;
  }

  handleClickStart() {
    this.hidePopup = true;
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

    .click-to-play {
      color: var(--color-white);
      margin: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-align: center;
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
      display: block;
      top: 0;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      padding: 1em;

      transition: opacity 250ms ease-out, transform 250ms ease-out;
    }

    .intro-message-wrapper[hidden] {
      display: block;
      opacity: 0;
      pointer-events: none;
      transform: translate3d(0%, 15%, 0);

      transition: opacity 250ms ease-out, transform 250ms ease-out;
    }

    .intro-message-wrapper > * {
      position: absolute;
      left: 50%;
      bottom: 1em;
      transform: translate3d(-50%, 0, 0);
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
