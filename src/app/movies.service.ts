import {Injectable, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isObject} from "util";
import {MovieData} from "./Components/movies/movies.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieDb  implements OnInit{


  movieList: object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MovieData>('/api/Movies').subscribe(data => {
      console.log("init service")
      // Read the result field from the JSON response.
      if (isObject(data)) {
        this.movieList = data;
        // Prints the first movie title.
      }
    });


  }

  loadDb(): Promise<MovieData[]> {
    return this.http.get<MovieData[]>('/api/Movies').toPromise().then(data => {
      if(isObject(data)){
        return data;
      }}).catch(this.handleError);
  }

  specificMovie(id): Promise<MovieData> {

    return this.http.get<MovieData>('/api/Movies/' + id).toPromise().then(data => {
      console.log(data)
      if(isObject(data)){
        return data;
      }}).catch(this.handleError);
  }



  list(){
    return this.movieList;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // Get all movies from the API
// Eksempel på en url for sortering på år i stigende rekkefølge: /api/Movies?sort=Year&&order=ASC


/*  getAllPosts() {
    return this.http.get('/api/Movies')
      .map(res => res.json());
  }*/
}
