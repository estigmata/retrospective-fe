import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdDialogModule,
  MdToolbarModule,
  MdMenuModule,
  MdProgressBarModule,
  MdTooltip,
  MdTooltipModule,
  MdSliderModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DndModule } from 'ng2-dnd';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { RetrospectiveRoutingModule } from './retrospective-routing.module';
import { RetrospectiveComponent } from './retrospective.component';
import { RetrospectiveService } from './services/retrospective.service';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';
import { CategoryComponent } from './category/category.component';
import { ItemService } from './services/item.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VoteItemComponent } from './vote-item/vote-item.component';
import { RetrospectiveResolverService } from './retrospective-resolver.service';
import { AddActionItemComponent } from './add-action-item/add-action-item.component';
import { ActionItemComponent } from './action-item/action-item.component';
import { ItemResolverService } from './resolvers/item/item-resolver.service';
import { ActionItemService } from './services/action-item.service';
import { GroupItemComponent } from './group-item/group-item.component';
import { ReportComponent } from './report/report.component';
import { environment } from './../../environments/environment';
import { SummaryDirective } from './item/item.directive';
import { AuthGuard } from './services/auth-guard.service';

const config: SocketIoConfig = { url: environment.backendPath, options: {} };

@NgModule({
  declarations: [
    RetrospectiveComponent,
    AddItemComponent,
    ItemComponent,
    CategoryComponent,
    ConfirmDialogComponent,
    VoteItemComponent,
    AddActionItemComponent,
    ActionItemComponent,
    GroupItemComponent,
    ReportComponent,
    SummaryDirective
  ],
  imports: [
    RetrospectiveRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdMenuModule,
    MdProgressBarModule,
    MdTooltipModule,
    MdSliderModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MdDialogModule,
    DndModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    RetrospectiveService,
    ItemService,
    RetrospectiveResolverService,
    ItemResolverService,
    ActionItemService,
    AuthGuard
  ],
  exports: [
    RetrospectiveComponent,
    ItemComponent,
    ConfirmDialogComponent,
    ActionItemComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})

export class RetrospectiveModule { }
