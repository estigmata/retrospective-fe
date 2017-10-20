import { Rate } from './rate.model';

export class Item {
  _id?: String;
  summary?: String;
  retrospective?: String;
  category?: String;
  children?: String;
  rates?: Rate[];
  rate? = 0;

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
