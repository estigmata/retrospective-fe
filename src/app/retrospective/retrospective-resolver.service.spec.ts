import { TestBed, inject } from '@angular/core/testing';
import { RetrospectiveService } from './services/retrospective.service';
import { RetrospectiveResolverService } from './retrospective-resolver.service';

describe('RetrospectiveResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RetrospectiveResolverService,
        { provide: RetrospectiveService, useValue: {}}
      ]
    });
  });

  it('should be created', inject([RetrospectiveResolverService], (service: RetrospectiveResolverService) => {
    expect(service).toBeTruthy();
  }));
});
