import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
import Deck from '../Deck';

/**
 * @customElement tiktok-app
 * @fires success
 * @fires failure
 */
export default class TiktokApp extends LitElement {
  static tagName = 'tiktok-app';

  static properties = {
    videos: {
      type: Array,
      attribute: false,
    },
  };

  constructor() {
    super();

    function createVideos() {
      return Deck.randomize([
        {
          image: new URL('../images/dystop-1.png', import.meta.url),
          hueRotate: Math.random() * 359 + 'deg',
        },
        {
          image: new URL('../images/dystop-2.png', import.meta.url),
          hueRotate: Math.random() * 359 + 'deg',
        },
        {
          image: new URL('../images/dystop-3.png', import.meta.url),
          hueRotate: Math.random() * 359 + 'deg',
        },
        {
          image: new URL('../images/dystop-4.png', import.meta.url),
          hueRotate: Math.random() * 359 + 'deg',
        },
      ]);
    }

    this.videos = [...createVideos(), ...createVideos(), ...createVideos()];
  }

  firstUpdated() {
    const lastItem = this.renderRoot.querySelector('li:last-child');

    setTimeout(
      () =>
        new IntersectionObserver(records => {
          if (records.some(record => record.isIntersecting)) {
            this.dispatchSuccess();
          }
        }).observe(lastItem),
      500
    );
  }

  renderVideo({ image, hueRotate }) {
    return html`<li class="video">
      <img src=${image} style="filter: hue-rotate(${hueRotate});" />
    </li>`;
  }

  render() {
    return html`
      <ul class="video-list">
        ${this.videos.map(this.renderVideo.bind(this))}
      </ul>
    `;
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      display: block;
      background: black;
      display: flex;
      flex-direction: column;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      overflow: auto;
      max-height: 100%;
      flex: 1 1 auto;
    }

    ul > * + * {
      border-top: 0.0625em solid gray;
    }

    img {
      width: 100%;
      display: block;
    }
  `;
}
