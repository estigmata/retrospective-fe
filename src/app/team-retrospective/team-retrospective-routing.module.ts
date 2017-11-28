import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamRetrospectiveComponent } from './team-retrospective.component';
import { CreateRetrospectiveComponent } from './create-retrospective/create-retrospective.component';
import { RetrospectiveListComponent } from './retrospective-list/retrospective-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { CreateTeamComponent } from './create-team/create-team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamRetrospectiveComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-retrospective/:teamId',
        component: CreateRetrospectiveComponent
      },
      {
        path: 'retrospective-list/:teamId',
        component: RetrospectiveListComponent
      },
      {
        path: 'create-team',
        component: CreateTeamComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class TeamRetrospectiveRoutingModule { }
