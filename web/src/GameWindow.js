import { LitElement, css, html } from 'lit';

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

    setTimeout(() => {
      this.notifications = [...this.notifications, {
        text: 'Hello world!',
      }];
    }, 30000);
  }

  render() {
    return html`
      <nav-bar></nav-bar>

      ${this.notifications.map(n => html`
        <notification-bubble>${n.text}</notification-bubble>
      `)}

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

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
      justify-items: center;
      gap: 1em;
      padding: 1em;
    }

    notification-bubble {
      position: absolute;
      left: 1em;
      right: 1em;
      top: 1em;
      box-shadow: 1px 1px 10px black;
      width: calc(100% - 2em);
    }
  `;
}

customElements.define('game-window', GameWindow);