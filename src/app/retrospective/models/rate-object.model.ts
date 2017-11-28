import { Item } from './item.model';

export class RateObject {
  userId?: string;
  isIncrement: boolean;
  item: Item;

  constructor (params: RateObject) {
    Object.assign(this, params);
  }
}
