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
