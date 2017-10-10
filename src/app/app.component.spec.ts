import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    expect(true).toBeTruthy();
  }));
});
