import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamRetrospectiveComponent } from './team-retrospective.component';
import { CreateRetrospectiveComponent } from './create-retrospective/create-retrospective.component';

const routes: Routes = [
  {
    path: '',
    component: TeamRetrospectiveComponent,
    children: [
      {
        path: 'create-retrospective',
        component: CreateRetrospectiveComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class TeamRetrospectiveRoutingModule { }
