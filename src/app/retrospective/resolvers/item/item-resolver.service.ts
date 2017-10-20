import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Injectable()
export class ItemResolverService implements Resolve<Item[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> {
    return this.itemService.getByRetrospective(route.params.id);
  }

  constructor(private itemService: ItemService) { }

}
