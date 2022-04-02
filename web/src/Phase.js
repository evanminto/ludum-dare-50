import Deck from './Deck';

export default class Phase {
  appDeck;

  /**
   *
   * @param {{ content : import('lit/html').TemplateResult }[]} apps
   */
  constructor(apps) {
    this.appDeck = new Deck(apps);
    console.log('shuffle');
    this.appDeck.shuffle();
  }
}
