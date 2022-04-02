import Deck from './Deck';

export default class Phase {
  appDeck;

  /**
   *
   * @param {import('./App').default[]} apps
   */
  constructor(apps) {
    this.appDeck = new Deck(apps);
    this.appDeck.shuffle();
  }
}
