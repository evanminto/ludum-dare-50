import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';
import Deck from '../Deck';

/**
 * @customElement email-app
 * @fires success
 * @fires failure
 */
export default class EmailApp extends LitElement {
  static tagName = 'email-app';

  static properties = {
    emails: {
      type: Array,
      attribute: false,
    },
  };

  constructor() {
    super();

    const emailsDeck = new Deck([
      {
        subject: 'Overpaying for Rent? GOOD',
        spam: true,
        deleted: false,
      },
      { subject: 'Lonely Scammers In Your Area', spam: true, deleted: false },
      {
        subject: 'You’re A Degenerate Gambler. Free BlackJack',
        spam: true,
        deleted: false,
      },
      {
        subject: 'ShitCoin - Invest Now Please Bro Please',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Party Invite - Hey, so we’re celebrating my birthday…',
        spam: false,
        deleted: false,
      },
      {
        subject: 'Comment Reply on YubNub Video - You have a reply…',
        spam: false,
        deleted: false,
      },
      {
        subject: 'Company Christmas Party - We’re meeting at…',
        spam: false,
        deleted: false,
      },
      {
        subject: 'Nile Shopping - Your order will be arriving today.',
        spam: false,
        deleted: false,
      },
    ]);

    emailsDeck.shuffle();
    this.emails = emailsDeck.toArray();
  }

  renderEmail({ subject, deleted }, index) {
    return html`<li class="email">
      ${subject}
      <icon-button
        icon="trash"
        ?disabled=${deleted}
        data-index=${index}
        @click=${this.handleClickDeleteSpam}
      ></icon-button>
    </li>`;
  }

  render() {
    return html`
      <ul class="email-list">
        ${this.emails.map(this.renderEmail.bind(this))}
      </ul>
    `;
  }

  handleClickDeleteSpam(event) {
    const email = this.emails[event.target.dataset.index];

    email.deleted = true;
    this.requestUpdate('emails');

    if (this.emails.some(({ spam, deleted }) => !spam && deleted)) {
      this.dispatchFailure();
    } else if (!this.emails.some(({ spam, deleted }) => spam && !deleted)) {
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
      background: lightgray;
    }

    .email-list {
      list-style: none;
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .email-list > * + * {
      border-top: 0.0625rem solid gray;
    }

    .email {
      display: flex;
      justify-content: space-between;
      padding: 0.5em 1em;
    }

    button {
      font: inherit;
    }
  `;
}
