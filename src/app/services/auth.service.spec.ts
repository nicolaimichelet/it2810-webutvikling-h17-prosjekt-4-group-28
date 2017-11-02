import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

//Authentication service - file automatically created, when auth files were created
describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
