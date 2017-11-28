import { Item } from './item.model';

export class RetrospectiveReport {
  _id?: String;
  summary?: String;
  retrospectiveId?: String;
  itemId?: Item;

  constructor(params: RetrospectiveReport) {
    Object.assign(this, params);
  }
}
