import { LitElement, css, html } from 'lit';
import { ref, createRef } from 'lit/directives/ref';

const NAME_TO_URL = {
  click: new URL('../sfx/click.mp3', import.meta.url),
  failure: new URL('../sfx/failure.mp3', import.meta.url),
  intro: new URL('../sfx/intro.mp3', import.meta.url),
  notification: new URL('../sfx/notification.mp3', import.meta.url),
  ringtone: new URL('../sfx/ringtone.mp3', import.meta.url),
  shutdown: new URL('../sfx/shutdown.mp3', import.meta.url),
  success: new URL('../sfx/success.mp3', import.meta.url),
};

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
    loop: {
      type: Boolean,
      attribute: false,
    },
  };

  /** @type {import('lit/directives/ref').Ref<HTMLAudioElement>} */
  audioRef = createRef();

  render() {
    return html`
      <audio src=${this.src} ?loop=${this.loop} @ ${ref(this.audioRef)}></audio>
    `;
  }

  async playSound(name, { loop = false } = {}) {
    const src = NAME_TO_URL[name];

    if (!src) {
      return;
    }

    this.src = src;
    this.loop = loop;
    await this.updated;
    const el = this.audioRef.value;

    if (el) {
      el.play();
    }
  }

  pauseSound() {
    const el = this.audioRef.value;

    if (el) {
      el.pause();
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
