import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdDialogModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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

@NgModule({
  declarations: [
    RetrospectiveComponent,
    AddItemComponent,
    ItemComponent,
    CategoryComponent,
    ConfirmDialogComponent,
    VoteItemComponent,
    AddActionItemComponent,
    ActionItemComponent
  ],
  imports: [
    RetrospectiveRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MdDialogModule,
  ],
  providers: [
    RetrospectiveService,
    ItemService,
    RetrospectiveResolverService,
    ItemResolverService,
    ActionItemService
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
