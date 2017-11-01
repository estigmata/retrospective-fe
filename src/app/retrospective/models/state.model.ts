export class State {
  edit?: Boolean;
  vote?: Boolean;
  addAction?: Boolean;
  group?: Boolean;

  constructor(params: State) {
    Object.assign(this, params);
  }
}
