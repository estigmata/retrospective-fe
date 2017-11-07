import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdButtonModule,
  MdFormFieldModule,
  MdDialog,
  MD_DIALOG_DATA
} from '@angular/material';
import { ItemComponent } from './item.component';

class MdDialogMock {
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MdCardModule,
        MdIconModule,
        MdInputModule,
        MdButtonModule,
        MdFormFieldModule
      ],
      providers: [
        { provide: MdDialog, useClass: MdDialogMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = {};
    component.state = {};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
