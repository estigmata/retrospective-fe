export class StepMessage {
  retrospective?: string;
  message?: string;

  constructor(params: StepMessage) {
    Object.assign(this, params);
  }
}
