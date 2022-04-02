export default class SuccessEvent extends Event {
  constructor() {
    super('success', {
      bubbles: true,
    });
  }
}
