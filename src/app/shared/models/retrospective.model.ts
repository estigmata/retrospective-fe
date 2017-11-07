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
  creationDate?: Date;
  done?: boolean;
  currentStep?: string;

  constructor(params: Retrospective) {
    Object.assign(this, params);
  }
}
