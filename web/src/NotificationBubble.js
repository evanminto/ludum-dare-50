import { LitElement, css, html } from 'lit';

/**
 * @customElement notification-bubble
 */
export default class NotificationBubble extends LitElement {
  render() {
    return html`
      <slot></slot>

      <button type="button" @click=${this.handleClickDismiss}>Dismiss</button>
    `;
  }

  handleClickDismiss() {
    this.dispatchEvent(new CustomEvent('dismiss'));
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 4em;
      background: white;
      border-radius: 1.5em;
      padding: 1em;
    }
  `;
}

customElements.define('notification-bubble', NotificationBubble);