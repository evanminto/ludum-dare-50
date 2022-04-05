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

    const spamEmails = Deck.randomize([
      {
        subject: 'HOT PUZZLES WAITING FOR YOUR SOLVE',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Awful Pizza at Even Worse Prices',
        spam: true,
        deleted: false,
      },
      {
        subject: 'You’re A Degenerate Gambler. Free BlackJack',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Want disappointment? Download HateDate Today',
        spam: true,
        deleted: false,
      },
      {
        subject: 'SEND DUDES - Enlist in the Marines',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Lonely Scammers In Your Area',
        spam: true,
        deleted: false,
      },
      {
        subject: 'You’re A Degenerate Gambler. Free BlackJack',
        spam: true,
        deleted: false,
      },
      {
        subject: 'These Cookies Will MAke you Crumb in a Millisecond',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Overpaying for Rent? GOOD',
        spam: true,
        deleted: false,
      },
      {
        subject: 'School’s Been Trying to Teach You…',
        spam: true,
        deleted: false,
      },
      {
        subject: 'Lonely Scammers In Your Area',
        spam: true,
        deleted: false,
      },
      {
        subject: 'ShitCoin - Invest Now Please Bro Please',
        spam: true,
        deleted: false,
      },
    ]).slice(0, 2);

    const nonSpamEmails = Deck.randomize([
      {
        subject: 'Party Invite - Hey, so we’re celebrating my birthday…',
        spam: false,
        deleted: false,
      },
      {
        subject: 'TPS Report - Coordinate with Tim Apple on these',
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
      {
        subject: 'Cursed Mobile - We haven’t received your payment.',
        spam: false,
        deleted: false,
      },
      {
        subject: 'eBy’s Auction - Nobody wants to buy your sHiT,',
        spam: false,
        deleted: false,
      },
      {
        subject: 'YubNub Video - Please stop uploading we’re begging',
        spam: false,
        deleted: false,
      },
      {
        subject: 'Updated Privacy Policy for HateDate',
        spam: false,
        deleted: false,
      },
    ]).slice(0, 3);

    this.emails = Deck.randomize([...spamEmails, ...nonSpamEmails]);
  }

  renderEmail({ subject, spam, deleted }, index) {
    return html`<li class="email ${deleted ? 'email--deleted' : ''}">
      ${spam ? html`<span class="spam">!</span>` : ''} ${subject}
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
      display: flex;
      flex-direction: column;
      background: var(--color-white);
    }

    .spam {
      color: #ff1e1f;
    }

    ul {
      flex: 1 1 auto;
      overflow: auto;
    }

    .email-list {
      list-style: none;
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .email-list > * + * {
      border-top: 0.0625em solid gray;
    }

    .email {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2em 1em;
      align-items: center;
      gap: 2em;
    }

    .email--deleted {
      opacity: 0.25;
    }

    button {
      font: inherit;
    }
  `;
}
