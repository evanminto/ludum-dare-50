import { LitElement, css, html } from 'lit';
import SuccessEvent from '../events/SuccessEvent';
import FailureEvent from '../events/FailureEvent';

/**
 * @customElement browser-app
 * @fires success
 * @fires failure
 */
export default class BrowserApp extends LitElement {
  static tagName = 'browser-app';

  static properties = {
    appBannerDismissed: Boolean,
    cookieBannerDismissed: Boolean,
    newsletterPopupDismissed: Boolean,
  };

  constructor() {
    super();

    this.appBannerDismissed = false;
    this.cookieBannerDismissed = false;
    this.newsletterPopupDismissed = false;
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
      <div class="app-banner" ?hidden=${this.appBannerDismissed}>
        Download the app
        <button type="button" @click=${this.handleClickApp}>x</button>
      </div>

      <div class="article">
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>Foo bar</p>
      </div>

      <div class="newsletter-popup" ?hidden=${this.newsletterPopupDismissed}>
        Sign up for the newsletter
        <button type="button" @click=${this.handleClickNewsletter}>
          Not right now because I'm a horrible person
        </button>
      </div>

      <div class="cookie-banner" ?hidden=${this.cookieBannerDismissed}>
        We track everything
        <button type="button" @click=${this.handleClickCookie}>Allow</button>
      </div>
    `;
  }

  handleClickApp() {
    this.appBannerDismissed = true;
    this.checkSuccess();
  }

  handleClickNewsletter() {
    this.newsletterPopupDismissed = true;
    this.checkSuccess();
  }

  handleClickCookie() {
    this.cookieBannerDismissed = true;
    this.checkSuccess();
  }

  checkSuccess() {
    if (
      this.appBannerDismissed &&
      this.newsletterPopupDismissed &&
      this.cookieBannerDismissed
    ) {
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

    button {
      font: inherit;
    }
  `;
}
