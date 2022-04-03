import shuffle from './utils/shuffle';

/** @template T */
export default class Deck {
  #cards = [];
  #index = 0;

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
    const result = this.#cards.splice(this.#index, 1);

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
    this.#index = 0;
  }

  /**
   * @returns {T}
   */
  discard() {
    return this.#cards.splice(this.#index, 1)[0];
  }

  get count() {
    return this.#cards.length;
  }

  /**
   * @returns {T}
   */
  get current() {
    return this.#cards[this.#index];
  }
}
