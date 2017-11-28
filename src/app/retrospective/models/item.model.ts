import { Rate } from './rate.model';
import { User } from '../../shared/models/user.model';

export class Item {
  _id?: String;
  summary?: String;
  retrospective?: String;
  category?: {_id: String, name: String};
  children?: Item[];
  rates?: Rate[];
  userRate? = 0;
  parent? = true;
  user?: User;
  color?: { h: Number, s: Number, l: Number };

  constructor(params: Item) {
    Object.assign(this, params);
  }
}
