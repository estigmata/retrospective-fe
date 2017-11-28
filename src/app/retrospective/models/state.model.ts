export class State {
  edit?: Boolean;
  vote?: Boolean;
  addAction?: Boolean;
  group?: Boolean;
  report?: Boolean;

  constructor(params: State) {
    Object.assign(this, params);
  }
}
