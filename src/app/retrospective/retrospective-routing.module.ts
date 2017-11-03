import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RetrospectiveComponent } from './retrospective.component';
import { AddItemComponent } from './add-item/add-item.component';
import { VoteItemComponent } from './vote-item/vote-item.component';
import { RetrospectiveResolverService } from './retrospective-resolver.service';
import { AddActionItemComponent } from './add-action-item/add-action-item.component';
import { ItemResolverService } from './resolvers/item/item-resolver.service';
import { GroupItemComponent } from './group-item/group-item.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: RetrospectiveComponent,
    resolve: {
      retrospective: RetrospectiveResolverService
    },
    children: [
      {
        path: 'add-items',
        component: AddItemComponent
      },
      {
        path: 'vote-items',
        component: VoteItemComponent
      },
      {
        path: 'action-items',
        component: AddActionItemComponent,
        resolve: {
          retrospectiveActionItems: ItemResolverService
        }
      },
      {
        path: 'group-items',
        component: GroupItemComponent
      },
      {
        path: 'report',
        component: ReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class RetrospectiveRoutingModule { }
