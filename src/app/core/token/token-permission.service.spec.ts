import { TestBed, inject } from '@angular/core/testing';

import { TokenPermissionService } from './token-permission.service';

describe('TokenPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenPermissionService]
    });
  });

  it('should be created', inject([TokenPermissionService], (service: TokenPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
