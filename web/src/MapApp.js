import { LitElement, css, html } from 'lit';
import SuccessEvent from './events/SuccessEvent';

/**
 * @customElement map-app
 * @fires success
 */
export default class MapApp extends LitElement {
  posts = [
    {
      handle: 'dril',
      content: 'Lorem ipsum',
      rtToComplete: true,
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
  ];

  render() {
    return html`
      Map
    `;
  }

  handleClickRetweet(rtToComplete) {
    this.dispatchEvent(new SuccessEvent());
  }

  static styles = css`
    :host {
      display: block;
      background: lightgray;
      padding: 1em;
    }

    ul {
      list-style: none;
      padding: 0;
    }
  `;
}

customElements.define('map-app', MapApp);