import { UserColor } from './user-color.model';
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
  users?: [ UserColor ];
  team?: string;

  constructor(params: Retrospective) {
    Object.assign(this, params);
  }
}
