export default class FailureEvent extends Event {
  constructor() {
    super('failure', {
      bubbles: true,
    });
  }
}
