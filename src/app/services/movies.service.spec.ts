import { TestBed, inject } from '@angular/core/testing';

import { MovieDb } from './movies.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MovieDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDb, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([MovieDb], (service: MovieDb) => {
    expect(service).toBeTruthy();
  }));
});
