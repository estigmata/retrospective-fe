import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MdFormFieldModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdDialogModule,
  MdSelectModule
} from '@angular/material';
  import { TranslateModule } from '@ngx-translate/core';

import { TeamRetrospectiveComponent } from './team-retrospective.component';
import { CreateRetrospectiveComponent } from './create-retrospective/create-retrospective.component';
import { TeamRetrospectiveRoutingModule } from './team-retrospective-routing.module';
import { RetrospectiveListComponent } from './retrospective-list/retrospective-list.component';
import { RetrospectiveService } from './services/retrospective.service';
import { StrategyService } from './services/strategy.service';
import { AuthGuard } from './services/auth-guard.service';
import { CreateTeamComponent } from './create-team/create-team.component';

@NgModule({
  imports: [
    TeamRetrospectiveRoutingModule,
    FormsModule,
    RouterModule,
    CommonModule,
    MdFormFieldModule,
    ReactiveFormsModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    TranslateModule,
    MdSelectModule
  ],
  declarations: [
    TeamRetrospectiveComponent,
    RetrospectiveListComponent,
    CreateRetrospectiveComponent,
    CreateTeamComponent
  ],
  providers: [
    RetrospectiveService,
    StrategyService,
    AuthGuard
  ],
  bootstrap: [ TeamRetrospectiveComponent ]
})
export class TeamRetrospectiveModule { }
