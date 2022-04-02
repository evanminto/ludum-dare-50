import shuffle from './utils/shuffle';

export default class PhaseDeck {
  #phases = [];
  #index = 0;
  #discarded = [];

  constructor(phases) {
    this.#phases = phases;
  }

  discard(index) {
    this.#discarded.push(index);
  }

  get isEmpty() {
    return this.#apps.length === this.#discarded.length;
  }

  goToNext() {
    while (!this.#discarded.includes(this.#index)) {
      this.#index += 1;
    }
  }

  get currentApp() {
    return this.#apps[this.#index];
  }

  get apps() {
    return this.#apps;
  }
}
