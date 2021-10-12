import { TestBed } from '@angular/core/testing';

import { MarcherService } from './marcher.service';

describe('MarcherService', () => {
  let service: MarcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
