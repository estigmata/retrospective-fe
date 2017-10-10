import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RetrospectiveListService } from './retrospective-list.service';
import { RetrospectiveListComponent } from './retrospective-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RetrospectiveListComponent],
  exports: [RetrospectiveListComponent],
  providers: [RetrospectiveListService]
})
export class RetrospectiveListModule { }
