import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import{ExampleDataSource} from './dataSource';
import {MatSort, MatDialog} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isObject} from 'util';
import { MovieDb,  } from '../../movies.service';
import {ArrayLikeObservable} from 'rxjs/observable/ArrayLikeObservable';
import {MovieComponent} from '../movie/movie.component';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',

  providers: [MovieDb]
})



export class MoviesComponent implements OnInit {
  chosenGenre: any = '';
  minRating: any = 0;
  displayedColumns = ['Rating', 'Title', 'Year', 'Genre'];
  dataSource: ExampleDataSource | null;
  toggle: any = {Action: false, Adventure: false, Animation: false, Drama: false, Romance: false, Fantasy: false, Scifi: false};
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogResult = '';
  dataChange: BehaviorSubject<MovieData[]> = new BehaviorSubject<MovieData[]>([]);


  constructor(public dialog: MatDialog, private http: HttpClient, private movieDb: MovieDb) {
    console.log('constr');
  }

  toggleGenre(name): void {
    if(name.value === 'Clear'){
      this.chosenGenre = '';
    }else{
      this.chosenGenre = name.value;
    }

    this.dataSource.toggl = this.chosenGenre;
  }

  ngOnInit(): void {
    this.generateList()
    this.dataSource = new ExampleDataSource(this, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    }

  /** Sets the Movie data displyed on in the Pop-up. */
  openDialog(data) {
    this.movieDb.specificMovie(data.Title).then( movies => {
      data = {
        '_id': movies._id,
        'Title': movies.Title,
        'Description': movies.Description,
        'Director': movies.Director,
        'Genre': movies.Genre,
        'Year': movies.Year,
        'Actors': movies.Actors
      };
      const dialog = this.dialog.open(MovieComponent, {
        data,
      });

      dialog.afterClosed().subscribe(result => {
        this.dialogResult = result;
      });
    });
  }

toggleRating(item): void {
  this.minRating = item.value;
  this.dataSource.rating = this.minRating;

}

  generateList() {
  this.movieDb.loadDb().then(movies => this.createList(movies));
  }



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
    const Id = movieList[i]._id;
    const Description = movieList[i].Description;
    const actors = movieList[i].actors;
    const Director = movieList[i].Director;
    const Genre = movieList[i].Genre;
    const Year = movieList[i].Year;
    const Title =  movieList[i].Title;
    const Rank =  movieList[i].Rank;
    const Rating = movieList[i].Rating;



    return {
      _id: Id,
      Description: Description,
      actors: actors,
      Director: Director,
      Genre: Genre,
      Runtime: Runtime,
      Year: Year,
      Title: Title,
      Rank: Rank,
      Rating: Rating

    };
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

