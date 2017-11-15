import { TestBed, inject } from '@angular/core/testing';
import {Http, Headers, HttpModule} from '@angular/http';

import { AuthService } from './auth.service';
import {HttpClientModule} from "@angular/common/http";

//Authentication service - file automatically created, when auth files were created
describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
