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
import { UserResolverService } from './resolvers/user/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RetrospectiveComponent,
    resolve: {
      userData: UserResolverService
    },
    children: [
      {
        path: 'add-items',
        component: AddItemComponent,
        resolve: {
          retrospectiveData: RetrospectiveResolverService
        }
      },
      {
        path: 'vote-items',
        component: VoteItemComponent,
        resolve: {
          retrospectiveData: RetrospectiveResolverService
        }
      },
      {
        path: 'action-items',
        component: AddActionItemComponent,
        resolve: {
          retrospectiveData: RetrospectiveResolverService
        }
      },
      {
        path: 'group-items',
        component: GroupItemComponent,
        resolve: {
          retrospectiveData: RetrospectiveResolverService
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        resolve: {
          retrospectiveData: RetrospectiveResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class RetrospectiveRoutingModule { }
