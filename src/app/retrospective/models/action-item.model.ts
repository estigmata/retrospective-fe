export class ActionItem {
  _id?: String;
  summary?: String;
  retrospectiveId?: String;
  itemId?: String;

  constructor(params: ActionItem) {
    Object.assign(this, params);
  }
}
