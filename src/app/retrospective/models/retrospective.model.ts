export class Retrospective {
  _id?: string;
  name?: string;
  categories?: [
    {
      _id?: string;
      name?: string;
    }
  ];
  maxRate?: number;

  constructor(params: Retrospective) {
    Object.assign(this, params);
  }
}
