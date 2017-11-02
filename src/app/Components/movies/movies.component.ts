


import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import{ExampleDataSource} from "./dataSource";
import { Movie } from './movie';
import {MatSort} from "@angular/material";
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from "@angular/common/http";
import {isObject} from "util";
import { MovieDb,  } from '../../movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',

  providers: [MovieDb]
})



export class MoviesComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  dialogResult: "";
  displayedColumns = ['_id', 'Title', 'Year', 'Genre'];
  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private movieDb: MovieDb) {
    console.log("constr");
  }



  ngOnInit(): void {
    this.generateList()
    this.dataSource = new ExampleDataSource(this, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }


  generateList() {
    const params = new HttpParams()
      .set('limit', '100').set('page', '0');
    this.http.get('/api/Movies', {params}).subscribe(data => {
      /** Read the result field from the JSON response. */
      if (isObject(data)) {
        const movieData = ((<MovieData> data));
        this.createList(movieData);
      }
    });
  }

  dataChange: BehaviorSubject<MovieData[]> = new BehaviorSubject<MovieData[]>([]);


  get data(): MovieData[] {
    return this.dataChange.value;
  }

  createList(movieData){
    for (let i = 0; i < movieData.length ; i++) { this.addMovie(i, movieData);}
  }


  /** Adds a new movie to the database. */
  addMovie(i, movieList) {

    const copiedData = this.data.slice();
    copiedData.push(this.createNewMovie(i, movieList));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new movie. */
  private createNewMovie(i, movieList) {

    const Description = movieList[i].Description;
    const actors = movieList[i].actors;
    const director = movieList[i].director;
    const Genre = movieList[i].Genre;
    const runtime = movieList[i].runtime;
    const Year = movieList[i].Year;
    const Title =  movieList[i].Title;




    return {
      _id: (this.data.length + 1).toString(),
      Description: Description,
      actors: actors,
      director: director,
      Genre: Genre,
      runtime: runtime,
      Year: Year,
      Title: Title

    };
  }

}

export interface MovieData {
  _id?: string;
  readMore?: string;
  poster?: string;
  Description?: string;
  actors?: string;
  director?: string;
  genre?: string;
  runtime?: string;
  year?: number;
  Title?: string;
}

