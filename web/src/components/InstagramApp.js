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
      content: 'Lorem ipsum',
      imageUrl: new URL('../images/insta-baby.png', import.meta.url),
    },
    {
      username: 'scratchedarm69',
      content: 'Dolor sit amet',
      imageUrl: new URL('../images/insta-cat.png', import.meta.url),
      answer: true,
    },
    {
      username: 'pet_as_my_personality',
      content: 'Lorem ipsum',
      imageUrl: new URL('../images/insta-dog.png', import.meta.url),
    },
    {
      username: 'the_great_outdouche',
      content: 'Dolor sit amet',
      imageUrl: new URL('../images/insta-hiker.png', import.meta.url),
    },
  ]);

  renderPost({ username, content, imageUrl, answer }) {
    return html`
      <li>
        <img src=${imageUrl} />

        <div class="post-text">
          <div>
            <icon-button
              icon="heart"
              data-answer=${answer ? '1' : '0'}
              @click=${this.handleClickLike}
            ></icon-button>
          </div>

          <b>${username}</b> ${content}
        </div>
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
      background: lightgray;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    button {
      display: block;
    }

    img {
      display: block;
      width: 100%;
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
