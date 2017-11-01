import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Injectable()
export class ItemResolverService implements Resolve<Item[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> {
    return this.itemService.getByRetrospective(route.parent.params.id)
      .map(items => {
        return items;
      }, error => {
        this.router.navigate(['team/retrospective-list']);
      });
  }

  constructor(private itemService: ItemService, private router: Router) { }

}
