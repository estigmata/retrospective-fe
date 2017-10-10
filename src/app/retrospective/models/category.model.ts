import { Item } from './item.model';

export class Category {
  constructor(
    public _id: string,
    public name: string,
    public items: Item[]
  ) {  }
}
