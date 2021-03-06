import { LitElement, css, html } from 'lit';

const NAME_TO_IMAGE = {
  Curdle: new URL('../images/Curdle.png', import.meta.url),
  Shitbird: new URL('../images/shitbird.png', import.meta.url),
  Instigator: new URL('../images/instigator.png', import.meta.url),
  UnHinged: new URL('../images/UnHinged.png', import.meta.url),
  DysTop: new URL('../images/DysTop.png', import.meta.url),
  HarassApp: new URL('../images/HarassApp.png', import.meta.url),
  Maps: new URL('../images/maps.png', import.meta.url),
  Email: new URL('../images/email.png', import.meta.url),
  Browser: new URL('../images/browser.png', import.meta.url),
  'To-Do': new URL('../images/to-do.png', import.meta.url),
  YubNub: new URL('../images/yubnub.png', import.meta.url),
  Phone: new URL('../images/pick-up.png', import.meta.url),
};

/**
 * @customElement app-icon
 */
export default class AppIcon extends LitElement {
  static tagName = 'app-icon';

  static properties = {
    name: String,
    hideName: {
      type: Boolean,
      attribute: 'hide-name',
    },
  };

  constructor() {
    super();
    this.hideName = false;
  }

  render() {
    return html`
      <img src=${NAME_TO_IMAGE[this.name]} class="icon" />
      ${this.name && !this.hideName ? html`<p>${this.name}</p>` : ''}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 0.85em;
    }

    .icon {
      display: block;
      width: var(--size-app-icon);
      height: var(--size-app-icon);
    }
  `;
}
