import { LitElement, css, html } from 'lit';

/**
 * @customElement notification-bubble
 */
export default class NotificationBubble extends LitElement {
  static tagName = 'notification-bubble';

  static properties = {
    app: String,
  };

  render() {
    return html`
      <div class="inner">
        <app-icon name=${this.app} hide-name></app-icon>
        <div><slot></slot></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      width: 100%;
      background: white;
      padding: 1em;
      align-items: center;
      gap: 1em;
    }

    .inner {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    .inner > * {
      flex: 1 1 auto;
    }

    .inner > app-icon {
      flex: 0 0 auto;
    }
  `;
}
