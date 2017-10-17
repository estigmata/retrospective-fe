export class Item {
  _id?: String;
  summary?: String;
  retrospective?: String;
  category?: String;
  children?: String;
  rate? = 0;

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
