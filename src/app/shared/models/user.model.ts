export class User {
  _id?: string;

  constructor(params: User) {
    Object.assign(this, params);
  }
}
