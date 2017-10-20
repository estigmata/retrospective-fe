export class Rate {
  public user?: String;
  public quantity?: number;

  constructor(params) {
    this.user = params.user || '';
    this.quantity = params.quantity || 0;
  }
}
