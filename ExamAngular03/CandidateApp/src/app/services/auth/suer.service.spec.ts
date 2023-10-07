import { TestBed } from '@angular/core/testing';

import { SuerService } from './suer.service';

describe('SuerService', () => {
  let service: SuerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
