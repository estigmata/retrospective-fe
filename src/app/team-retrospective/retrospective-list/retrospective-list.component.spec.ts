import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MdIconModule } from '@angular/material';
import { RetrospectiveListComponent } from './retrospective-list.component';
import { RetrospectiveService } from '../services/retrospective.service';
import { Observable } from 'rxjs/Observable';

describe('RetrospectiveListComponent', () => {
  let component: RetrospectiveListComponent;
  let fixture: ComponentFixture<RetrospectiveListComponent>;

  const retrospectiveService = { getRetrospectiveList: () => Observable.of([]) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RetrospectiveListComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        MdIconModule
      ],
      providers: [
        { provide: RetrospectiveService, useValue: retrospectiveService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrospectiveListComponent);
    component = fixture.componentInstance;
    component.retrospectiveList = [];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
