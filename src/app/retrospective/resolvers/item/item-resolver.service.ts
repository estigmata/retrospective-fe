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
import { RetrospectiveService } from '../../services/retrospective.service';
import { Retrospective } from '../../../shared/models/retrospective.model';

@Injectable()
export class ItemResolverService implements Resolve<Item[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> {
    return this.retrospectiveService.getRetrospective(route.parent.params.id)
      .switchMap(retrospectiveFounded => {
        const pathToCurrentStep = `retrospective/${route.parent.params.id}/${retrospectiveFounded.currentStep}`;
        if (route.routeConfig.path !== retrospectiveFounded.currentStep) {
          this.router.navigate([pathToCurrentStep]);
        }

        if (route.routeConfig.path === 'vote-items') {
          return this.itemService.getItemsWithRatesByUser(route.parent.params.id);
        }
        return this.itemService.getByRetrospective(route.parent.params.id);
      })
      .map(items => {
        return items;
      }, error => {
        this.router.navigate(['team/retrospective-list']);
      });
  }

  constructor(
    private itemService: ItemService,
    private router: Router,
    private retrospectiveService: RetrospectiveService) { }
}
