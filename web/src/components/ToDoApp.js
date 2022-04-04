import { LitElement, css, html } from 'lit';
import Deck from '../Deck';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement todo-app
 * @fires success
 */
export default class TwitterApp extends LitElement {
  static tagName = 'todo-app';

  static properties = {
    users: {
      type: Array,
      attribute: false,
    },
  };

  constructor() {
    super();

    // Ditch Date
    // Track box wine shipment
    // Get cracked screen fixed
    // Fix friend’s screen too
    // And my dad’s
    // Come up with rent excuse
    // Post apology screenshot
    // Unfollow Bad Take Guy
    // Cancel YubNub Premium
    // Meditate Infinities
    // Solve Cold Fusion

    this.items = Deck.randomize([
      {
        content: 'Ditch Date',
        checked: false,
      },
      {
        content: 'Track box wine shipment',
        checked: false,
      },
      {
        content: 'Get cracked screen fixed',
        checked: false,
      },
      {
        content: 'Fix friend’s screen too',
        checked: false,
      },
      {
        content: 'And my dad’s',
        checked: false,
      },
      {
        content: 'Come up with rent excuse',
        checked: false,
      },
      {
        content: 'Post apology screenshot',
        checked: false,
      },
      {
        content: 'Unfollow Bad Take Guy',
        checked: false,
      },
      {
        content: 'Cancel YubNub Premium',
        checked: false,
      },
      {
        content: 'Meditate Infinities',
        checked: false,
      },
      {
        content: 'Solve Cold Fusion',
        checked: false,
      },
    ]);

    [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ].forEach(index => (this.items[index].checked = true));
  }

  render() {
    return html`
      <h1>To-Do</h1>
      <ul>
        ${this.items.map(
          (item, index) => html`
            <li
              class="item ${item.checked ? 'item--checked' : ''}"
              @click=${event => this.handleClickCheckbox(event, index)}
            >
              <button type="button" aria-pressed=${item.checked}>
                <img src=${new URL('../images/x.png', import.meta.url)} />
              </button>
              <p>${item.content}</p>
            </li>
          `
        )}
      </ul>
    `;
  }

  handleClickCheckbox(event, index) {
    const item = this.items[index];

    item.checked = !item.checked;
    this.requestUpdate('items');

    if (!this.items.some(item => !item.checked)) {
      this.dispatchSuccess();
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
      background: #ffeb78;
      display: flex;
      flex-direction: column;
      padding: 1em;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      overflow: auto;
      max-height: 100%;
      flex: 1 1 auto;
    }

    .item {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    button {
      font: inherit;
      border: 0.125em solid currentColor;
      background: none;
      padding: 0.25em;
    }

    img {
      display: block;
      transition: opacity 100ms ease-out, transform 100ms ease-out;
    }

    [aria-pressed='false'] img {
      opacity: 0;
      transform: scale(0.25);
    }
  `;
}
