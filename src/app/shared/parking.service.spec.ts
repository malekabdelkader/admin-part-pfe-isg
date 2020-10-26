import { TestBed } from '@angular/core/testing';

import { ParkService } from './park.service';

describe('ParkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkService = TestBed.get(ParkService);
    expect(service).toBeTruthy();
  });
});
