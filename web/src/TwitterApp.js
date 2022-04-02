import { LitElement, css, html } from 'lit';

/**
 * @customElement app-screen
 */
export default class TwitterApp extends LitElement {
  posts = [
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
        ${this.posts.map(post => html`
          <li>
            <b>${post.handle}</b> ${post.content}
          </li>
        `)}
      </ul>
    `;
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

customElements.define('twitter-app', TwitterApp);