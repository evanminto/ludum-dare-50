import { LitElement, css, html } from 'lit';
import Deck from '../Deck';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
import TapEvent from '../events/TapEvent';

/**
 * @customElement twitter-app
 * @fires success
 */
export default class TwitterApp extends LitElement {
  static tagName = 'twitter-app';

  static properties = {
    users: {
      type: Array,
      attribute: false,
    },
  };

  constructor() {
    super();

    this.users = Deck.randomize([
      {
        avatar: new URL('../images/pfp-0.png', import.meta.url),
        username: 'firstname_lastname42069',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-1.png', import.meta.url),
        username: 'jacksmith2020',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-2.png', import.meta.url),
        username: 'HDMI_simp',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-3.png', import.meta.url),
        username: 'theGratest',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-4.png', import.meta.url),
        username: 'shitLord1999',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-5.png', import.meta.url),
        username: 'me_n_my_truck',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-6.png', import.meta.url),
        username: 'keyboard_warcrimes',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-7.png', import.meta.url),
        username: 'print_spleen',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-8.png', import.meta.url),
        username: 'drum_dumpster',
        blocked: false,
      },
      {
        avatar: new URL('../images/pfp-9.png', import.meta.url),
        username: 'rudeOil',
        blocked: false,
      },
    ]).slice(0, 6);
  }

  render() {
    return html`
      <ul>
        ${this.users.map(
          (user, index) => html`
            <li class="user ${user.blocked ? 'user--blocked' : ''}">
              <div class="user-data">
                <img src=${user.avatar} />
                <span>${user.username}</span>
              </div>
              <basic-button data-index=${index} @click=${this.handleClickBlock}>
                Block
              </basic-button>
            </li>
          `
        )}
      </ul>
    `;
  }

  handleClickBlock(event) {
    const { index } = event.target.dataset;
    const oldUsers = [...this.users];

    this.users[index].blocked = true;

    const success = !this.users.some(user => !user.blocked);

    if (!success) {
      this.dispatchTap();
    }

    this.requestUpdate('users', oldUsers);

    if (success) {
      this.dispatchSuccess();
    }
  }

  dispatchSuccess() {
    this.dispatchEvent(new SuccessEvent());
  }

  dispatchTap() {
    this.dispatchEvent(new TapEvent());
  }

  dispatchFailure() {
    this.dispatchEvent(new FailureEvent());
  }

  static styles = css`
    :host {
      display: block;
      background: var(--color-white);
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

    button {
      font: inherit;
    }

    .user {
      display: flex;
      align-items: center;
      padding: 1em;
      justify-content: space-between;
      gap: 1em;
    }

    .user-data {
      display: flex;
      align-items: center;
      gap: 1em;
      word-break: break-word;
    }

    .user--blocked {
      opacity: 0.5;
    }
  `;
}
