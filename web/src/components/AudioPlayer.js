import { LitElement, css, html } from 'lit';
import { ref, createRef } from 'lit/directives/ref';

const NAME_TO_URL = {};

/**
 * @customElement audio-player
 */
export default class AudioPlayer extends LitElement {
  static tagName = 'audio-player';

  static properties = {
    src: {
      type: String,
      attribute: false,
    },
  };

  /** @type {import('lit/directives/ref').Ref<HTMLAudioElement>} */
  audioRef = createRef();

  render() {
    return html` <audio src=${this.src} ${ref(this.audioRef)}></audio> `;
  }

  async playSound(name, { loop = false } = {}) {
    const src = NAME_TO_URL[name];

    if (!src) {
      return;
    }

    this.src = await this.updated;
    const el = this.audioRef.value;

    if (el) {
      el.play();
    }
  }

  static styles = css`
    :host {
      display: none;
    }

    audio {
      display: none;
    }
  `;
}
