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
      <div class="banner app-banner" ?hidden=${this.appBannerDismissed}>
        <p>Download the app</p>

        <basic-button @click=${this.handleClickApp}>x</basic-button>
      </div>

      <div class="article">
        <h1>Everything You Already Believe Is Correct, Experts Say</h1>

        <p>
          Today, an opinion you held for a long time (not because of us of
          course), has been confirmed by every world leader. You were totally
          right and your uncle was wrong, and he’s going to get on his knees and
          shit and cry.
        </p>
        <p>
          All the bad people are done for and they don’t stand a chance because
          you totally wrote about this online long before anyone was discussing
          it and you didn’t even get a re-post. You’re like the Gandhi of your
          time seriously.
        </p>
      </div>

      <div class="newsletter-popup" ?hidden=${this.newsletterPopupDismissed}>
        <p>Sign Up for Our Newsletter!</p>

        <div class="button-options">
          <basic-button @click=${this.handleClickNewsletter}>
            Yes, please spam me
          </basic-button>

          <basic-button @click=${this.handleClickNewsletter}>
            No, I hate emails
          </basic-button>
        </div>
      </div>

      <div class="banner cookie-banner" ?hidden=${this.cookieBannerDismissed}>
        <p>Let us track everything you do please.</p>

        <div class="button-options">
          <basic-button @click=${this.handleClickCookie}>Allow</basic-button>
          <basic-button @click=${this.handleClickCookie}>
            Don’t Allow
          </basic-button>
        </div>
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

    * {
      box-sizing: border-box;
    }

    p {
      margin: 0;
    }

    p + p {
      margin-top: 1em;
    }

    button {
      font: inherit;
    }

    .banner {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: white;
      padding: 2em 1em;
      display: flex;
      justify-content: space-between;
      gap: 1em;
      box-shadow: var(--shadow);
    }

    .cookie-banner {
      bottom: 0;
      top: auto;
      flex-direction: column;
      box-shadow: var(--shadow);
    }

    .newsletter-popup {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 5em 1em;
      width: calc(100% - 2em);
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .button-options {
      display: flex;
      gap: 0.5em;
    }

    .button-options > * {
      flex: 1 1 calc((40rem - 100%) * 9999);
    }

    [hidden] {
      display: none !important;
    }
  `;
}
