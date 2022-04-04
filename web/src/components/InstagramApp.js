import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
import Deck from '../Deck';

/**
 * @customElement instagram-app
 * @fires success
 */
export default class TwitterApp extends LitElement {
  static tagName = 'instagram-app';

  posts = Deck.randomize([
    {
      username: 'the_offspring',
      content: 'hope you like these because 3,000 more are coming',
      imageUrl: new URL('../images/insta-baby.png', import.meta.url),
    },
    {
      username: 'scratchedarm69',
      content: 'it thirsts for Blood',
      imageUrl: new URL('../images/insta-cat.png', import.meta.url),
      answer: true,
    },
    {
      username: 'pet_as_my_personality',
      content: 'like this post or i swear to god',
      imageUrl: new URL('../images/insta-dog.png', import.meta.url),
    },
    {
      username: 'the_great_outdouche',
      content: 'god i look good',
      imageUrl: new URL('../images/insta-hiker.png', import.meta.url),
    },
  ]);

  renderPost({ username, content, imageUrl, answer }) {
    return html`
      <li>
        <img
          src=${imageUrl}
          width="128"
          height="128"
          data-answer=${answer ? '1' : '0'}
          @click=${this.handleClickLike}
        />

        <div class="post-text"><b>${username}</b> ${content}</div>
      </li>
    `;
  }

  render() {
    return html`
      <ul>
        ${this.posts.map(this.renderPost.bind(this))}
      </ul>
    `;
  }

  handleClickLike(event) {
    if (event.target.dataset.answer === '1') {
      this.dispatchSuccess();
    } else {
      this.dispatchFailure();
    }
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
      background: var(--color-black);
      color: var(--color-white);
      display: flex;
      flex-direction: column;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      flex: 1 1 auto;
      overflow: auto;
    }

    button {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      image-rendering: pixelated;
    }

    .post-text {
      padding: 1em;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    button {
      font: inherit;
    }
  `;
}
