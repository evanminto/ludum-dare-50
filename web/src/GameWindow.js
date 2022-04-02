import { LitElement, css, html } from 'lit';
import script from './script.json';

/**
 * @customElement game-window
 */
export default class GameWindow extends LitElement {
  static properties = {
    currentAppId: String,
    notifications: {
      type: Array,
      attribute: false,
    },
  };

  apps = [
    {
      name: 'Twitter',
      id: 'twitter',
      content: html`Twitter`,
    },
    {
      name: 'Instagram',
      id: 'instagram',
      content: html`Instagram`,
    },
    {
      name: 'Email',
      id: 'email',
      content: html`Email`,
    },
    {
      name: 'Notes',
      id: 'notes',
      content: html`Notes`,
    }
  ];

  constructor() {
    super();

    this.notifications = [];

    let seconds = 0;

    setInterval(() => {
      const event = script.events.find(event => event.time === seconds);

      if (event) {
        if (event.type === 'notification') {
          this.notifications = [...this.notifications, {
            text: event.content,
          }];
        }
      }

      seconds += 1;
    }, 1000);
  }

  render() {
    return html`
      <nav-bar></nav-bar>

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

      ${this.currentAppId
        ? html`
          <app-screen @back=${this.handleBack}>${this.currentApp.content}</app-screen>
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

  handleBack() {
    this.currentAppId = null;
  }

  handleDismiss(index) {
    const newNotifs = [...this.notifications];
    newNotifs.splice(index, 1);
    this.notifications = newNotifs;
  }

  get currentApp() {
    return this.apps.find(({ id }) => id === this.currentAppId);
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