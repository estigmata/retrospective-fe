export class State {
  edit?: Boolean;
  vote?: Boolean;
  addAction?: Boolean;

  constructor(params: State) {
    Object.assign(this, params);
  }
}
