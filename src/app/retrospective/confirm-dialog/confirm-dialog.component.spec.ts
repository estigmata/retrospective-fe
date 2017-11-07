import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  MdIconModule,
  MdButtonModule,
  MdDialogModule,
  MdDialogRef,
  MD_DIALOG_DATA
} from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';

class MdDialogRefMock {
}

class MdDialogDataMock {
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      imports: [
        TranslateModule.forRoot(),
        MdIconModule,
        MdButtonModule,
        MdDialogModule
      ],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: MD_DIALOG_DATA, useClass: MdDialogDataMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
