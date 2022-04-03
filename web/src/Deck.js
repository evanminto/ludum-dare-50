import shuffle from './utils/shuffle';

/** @template T */
export default class Deck {
  /**
   * @param {T[]} arr
   */
  static randomize(arr) {
    const deck = new Deck(arr);
    deck.shuffle();

    return deck.toArray();
  }

  /** @type {T[]} */
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
    this.#cards = [card, ...this.#cards];
  }

  shuffle() {
    if (this.count <= 1) {
      return;
    }

    const topCard = this.#cards[0];

    while (this.#cards[0] === topCard) {
      shuffle(this.#cards);
    }
  }

  get count() {
    return this.#cards.length;
  }

  toArray() {
    return [...this.#cards];
  }
}
