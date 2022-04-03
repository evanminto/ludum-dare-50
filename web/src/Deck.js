import shuffle from './utils/shuffle';

/** @template T */
export default class Deck {
  #cards = [];

  /**
   * @param {T[]} cards
   */
  constructor(cards) {
    this.#cards = cards;
  }

  /**
   * @returns {T}
   */
  draw() {
    const result = this.#cards.splice(0, 1);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  /**
   * @param {T} card
   */
  putBack(card) {
    this.#cards.push(card);
  }

  shuffle() {
    shuffle(this.#cards);
  }

  get count() {
    return this.#cards.length;
  }
}
