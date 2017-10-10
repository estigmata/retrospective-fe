import { TestBed, async } from '@angular/core/testing';

import { RetrospectiveService } from './retrospective.service';

describe('RetrospectiveService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();
  }));

  it('should create the service', async(() => {
    expect(true).toBeTruthy();
  }));
});
