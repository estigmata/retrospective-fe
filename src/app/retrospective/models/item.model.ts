import { Rate } from './rate.model';

export class Item {
  _id?: String;
  summary?: String;
  retrospective?: String;
  category?: String;
  children?: Item[];
  rates?: Rate[];
  userRate? = 0;
  parent? = true;

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
