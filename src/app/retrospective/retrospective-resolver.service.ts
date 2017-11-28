import { Injectable } from '@angular/core';
import {
   Resolve,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Retrospective } from '../shared/models/retrospective.model';
import { Item } from './models/item.model';
import { RetrospectiveData } from './models/retrospective-data.model';
import { RetrospectiveService } from './services/retrospective.service';
import { ItemService } from './services/item.service';
import { ActionItemService } from './services/action-item.service';


@Injectable()
export class RetrospectiveResolverService implements Resolve<RetrospectiveData> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RetrospectiveData> {
    return Observable.forkJoin([
        this.retrospectiveService.getRetrospective(route.parent.params.id),
        this.itemService.getByRetrospective(route.parent.params.id),
        this.itemService.getItemsWithRatesByUser(route.parent.params.id),
        this.actionItemService.getActionItems(route.parent.params.id)
      ])
      .map((data: any) => {
        const [retrospective, items, voteItems, actionItems] = data;
        if (route.routeConfig.path !== retrospective.currentStep) {
          this.router.navigate([`retrospective/${retrospective._id}/${retrospective.currentStep}`]);
        }
        return {
          retrospective: data[0],
          items: retrospective.currentStep === 'vote-items' ? voteItems : items,
          actionItems
        };
      });
  }

  constructor(
    private retrospectiveService: RetrospectiveService,
    private itemService: ItemService,
    private actionItemService: ActionItemService,
    private router: Router
  ) { }
}
