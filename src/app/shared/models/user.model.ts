export class User {
  _id?: string;
  name?: string;
  role?: string;
  token?: string;
  password?: string;
  team?: string;

  constructor(params: User) {
    Object.assign(this, params);
  }
}
