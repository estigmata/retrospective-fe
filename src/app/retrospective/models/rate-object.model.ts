import { Item } from './item.model';

export class RateObject {
  isIncrement: boolean;
  item: Item;
  userId: number;

  constructor (params: RateObject) {
    Object.assign(this, params);
  }
}
