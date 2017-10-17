import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RetrospectiveComponent } from './retrospective.component';
import { AddItemComponent } from './add-item/add-item.component';
import { VoteItemComponent } from './vote-item/vote-item.component';
import { RetrospectiveResolverService } from './retrospective-resolver.service';

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
        component: VoteItemComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class RetrospectiveRoutingModule { }
