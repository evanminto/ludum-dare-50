import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement twitter-app
 * @fires success
 */
export default class TwitterApp extends LitElement {
  static tagName = 'twitter-app';

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
      <ul>
        ${this.posts.map(
          post => html`
            <li>
              <b>${post.handle}</b> ${post.content}

              <button
                type="button"
                @click=${() => this.handleClickRetweet(post.rtToComplete)}
              >
                RT
              </button>

              <button type="button">Like</button>
            </li>
          `
        )}
      </ul>

      <button type="button" @click=${this.handleSuccess}>Success</button>

      <button type="button" @click=${this.handleFailure}>Failure</button>
    `;
  }

  handleSuccess() {
    this.dispatchSuccess();
  }

  handleFailure() {
    this.dispatchFailure();
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
      background: lightgray;
      padding: 1em;
    }

    ul {
      list-style: none;
      padding: 0;
    }
  `;
}
