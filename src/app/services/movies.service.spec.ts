import { TestBed, inject } from '@angular/core/testing';

import { MovieDb } from './movies.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MockMovies} from './movies.data.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MovieDb', () => {
  let MovieDb : MovieDb;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDb],
      imports: [HttpClientTestingModule]
    });
    MovieDb = TestBed.get(MovieDb);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([MovieDb], (service: MovieDb) => {
    expect(service).toBeTruthy();
  }));

});
