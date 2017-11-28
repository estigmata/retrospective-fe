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
  MdProgressBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DndModule } from 'ng2-dnd';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    FlexLayoutModule,
    HttpClientModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdMenuModule,
    MdProgressBarModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MdDialogModule,
    DndModule,
    SignUpRoutingModule
  ],
  providers: [ ],
  exports: [ ]
})

export class SignUpModule { }
