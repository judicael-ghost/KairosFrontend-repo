import { TestBed } from '@angular/core/testing';

import { StockMenuService } from './stock-menu.service';

describe('StockMenuService', () => {
  let service: StockMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
