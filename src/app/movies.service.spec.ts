import { TestBed, inject } from '@angular/core/testing';

import { MovieDb } from './movies.service';

describe('MovieDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDb]
    });
  });

  it('should be created', inject([MovieDb], (service: MovieDb) => {
    expect(service).toBeTruthy();
  }));
});
