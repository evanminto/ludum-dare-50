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
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
    },
    {
      handle: 'fart',
      content: 'Dolor sit amet',
    },
    {
      handle: 'dril',
      content: 'Lorem ipsum',
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

              <div>
                <span>RT</span>
                <span>Like</span>
              </div>
            </li>
          `
        )}
      </ul>
    `;
  }

  firstUpdated() {
    const lastItem = this.renderRoot.querySelector('li:last-child');
    // setInterval(() => {
    //   if (window.scrollY >= window.scroll window.outerHeight) {

    //   }
    // }, 250)
    new IntersectionObserver(records => {
      if (records.some(record => record.isIntersecting)) {
        this.dispatchSuccess();
      }
    }).observe(lastItem);
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

    button {
      font: inherit;
    }
  `;
}
