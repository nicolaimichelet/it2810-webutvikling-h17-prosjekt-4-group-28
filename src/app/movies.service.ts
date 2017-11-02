import {Injectable, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {isObject} from "util";
import {MovieData} from "./Components/movies/movies.component";
import {Movie} from "./Components/movies/movie";

@Injectable()
export class MovieDb  implements OnInit{


  movieList: object;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/Movies').subscribe(data => {
      console.log("init service")
      // Read the result field from the JSON response.
      if (isObject(data)) {
        const movieData = ((<MovieData> data));
        this.movieList = movieData;
        // Prints the first movie title.
      }
    });


  }

  loadDb(): Promise<Movie[]> {
    this.http.get('/api/Movies').subscribe(data => {
      console.log("laster")
      // Read the result field from the JSON response.
        console.log("lol, na kom dataten")
        const movieData = ((<MovieData> data));
        this.movieList = movieData;
        // Prints the first movie title
      return Promise.resolve(this.movieList);
    })
    return Promise.resolve(this.movieList);
  }


  getMovies(): Promise<Movie[]> {
    return Promise.resolve(this.movieList);
  }

  list(){
    return this.movieList;
  }




  // Get all movies from the API
// Eksempel på en url for sortering på år i stigende rekkefølge: /api/Movies?sort=Year&&order=ASC


/*  getAllPosts() {
    return this.http.get('/api/Movies')
      .map(res => res.json());
  }*/
}
