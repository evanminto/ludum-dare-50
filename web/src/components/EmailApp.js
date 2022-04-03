import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

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

    this.emails = [
      {
        subject: 'Lorem ipsum',
        spam: false,
        deleted: false,
      },
      { subject: 'Dolor sit amet', spam: true, deleted: false },
      {
        subject: 'Foo bar',
        spam: true,
        deleted: false,
      },
    ];
  }

  renderEmail({ subject, deleted }, index) {
    return html`<li class="email">
      ${subject}
      <button
        type="button"
        ?disabled=${deleted}
        data-index=${index}
        @click=${this.handleClickDeleteSpam}
      >
        Delete
      </button>
    </li>`;
  }

  render() {
    return html`
      <ul class="messages-list">
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
      padding: 1em;
    }
  `;
}
