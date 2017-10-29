import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  // Get all movies from the API
// Eksempel på en url for sortering på år i stigende rekkefølge: /api/Movies?sort=Year&&order=ASC


  getAllPosts() {
    return this.http.get('/api/Movies')
      .map(res => res.json());
  }
}
