import { Rate } from './rate.model';

export class Item {
  _id?: String;
  summary?: String;
  retrospective?: String;
  category?: Object;
  children?: Item[];
  rates?: Rate[];
  userRate? = 0;
  parent? = true;
  user?: string;

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
