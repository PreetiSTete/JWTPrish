import { TestBed } from '@angular/core/testing';

import { AppJwtService } from './app-jwt.service';

describe('MyJwtServicesService', () => {
  let service: AppJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
