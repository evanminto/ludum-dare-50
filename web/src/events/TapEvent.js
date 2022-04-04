export default class TapEvent extends Event {
  constructor() {
    super('tap', {
      bubbles: true,
    });
  }
}
