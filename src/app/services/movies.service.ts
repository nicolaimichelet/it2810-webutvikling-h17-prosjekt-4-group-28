import {Injectable, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isObject} from "util";
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

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
// returns all the movies Todo: limit and skip for dynamic loading
  loadDb(): Promise<MovieData[]> {
    return this.http.get<MovieData[]>('/api/Movies').toPromise().then(data => {
      if(isObject(data)){
        return data;
      }}).catch(this.handleError);
  }
// Returns one movie
  specificMovie(id): Promise<MovieData> {
    return this.http.get<MovieData>('/api/Movies/' + id).toPromise().then(data => {
      if(isObject(data)){
        return data;
      }}).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for debug only
    return Promise.reject(error.message || error);
  }


  getMovies(name: string, amount: number, index: number, genre: string, rating: number, sort: string, sortType: number): Observable<MovieData[]> {
    return this.http.get<MovieData[]>('api/Movies/' + name + '/' + sort + '/' + sortType + '/' + genre + '/' + rating + '/' + index + '/' + amount);
  }
}

export interface MovieData {
  _id?: string;
  Description?: string;
  Actors?: string;
  Director?: string;
  Genre?: string;
  Year?: number;
  Title?: string;
  Rank: number;
  Rating: number;
}
