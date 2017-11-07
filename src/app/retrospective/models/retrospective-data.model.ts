import { Item } from './item.model';
import { Retrospective } from '../../shared/models/retrospective.model';

export class RetrospectiveData {
  retrospective: Retrospective;
  items: Item[];
}
