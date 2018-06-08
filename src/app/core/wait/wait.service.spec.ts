import { TestBed, inject } from '@angular/core/testing';

import { WaitService } from './wait.service';

describe('WaitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitService]
    });
  });

  it('should be created', inject([WaitService], (service: WaitService) => {
    expect(service).toBeTruthy();
  }));
});
