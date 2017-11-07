import { TestBed, inject } from '@angular/core/testing';

import { Router } from '@angular/router';

import { ItemResolverService } from './item-resolver.service';
import { ItemService } from './../../services/item.service';

describe('ItemResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemResolverService,
        { provide: ItemService, useValue: {}},
        { provide: Router, useValue: {}}
      ]
    });
  });

  it('should be created', inject([ItemResolverService], (service: ItemResolverService) => {
    expect(service).toBeTruthy();
  }));
});
