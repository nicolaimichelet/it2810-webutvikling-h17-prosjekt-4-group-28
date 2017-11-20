import {Injectable, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isObject} from "util";
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MovieDb{
  constructor(private http: HttpClient) {}
// Returns one movie-module
  specificMovie(id): Promise<MovieData> {
    return this.http.get<MovieData>('/api/Movies/' + id).toPromise().then(data => {
      if(isObject(data)){
        return data;
      }}).catch(err => console.log('error' + err));
  }


  getMovies(data): Promise<MovieData[]> {
    return this.http.get<MovieData[]>('api/Movies/'
      + (data.searchString === '' ? 'undefined' : data.searchString)
      + '/' + data.sort
      + '/' + data.sortType
      + '/' + data.genreString
      + '/' + data.ratingNumber
      + '/' + data.limit).toPromise().then(movie =>{
        if(isObject(movie)){
          return movie;
        }
    }).catch(err => console.log('error' + err));
  }

  getMovieRatings(data): Promise<any []> {
    return this.http.get<MovieData[]>('api/count/'
      + (data.searchString === '' ? 'undefined' : data.searchString)
      + '/' + data.genreString
      + '/' + data.ratingNumber).toPromise().then(movie =>{
      console.log(movie);
      if(isObject(movie)){

        return movie;
      }
    }).catch(err => console.log(err));
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
