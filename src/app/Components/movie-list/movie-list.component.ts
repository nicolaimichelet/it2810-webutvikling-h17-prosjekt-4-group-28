import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MovieData} from '../../services/movies.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {MovieDb} from '../../services/movies.service';
import {MovieComponent} from '../movie/movie.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(
    private movieListService: MovieDb,
    private http: HttpClient,
    public dialog: MatDialog,
    public movieDb: MovieDb,
  ) { }

  movies: MovieData[];

  index = 0;
  public renderTreshold = 30;
  canRenderNew = true;
  sort: string = 'none';
  sortType: number = 1;
  @Input('search') searchString: string;
  @Input() genreString: string;
  @Input() ratingNumber: number;
  dialogResult = '';

  sortData(event){
    console.log(event)
    this.sort = event.active;
    if (event.direction === 'asc'){
      this.sortType = 1
    }
    else if(event.direction === 'desc'){
      this.sortType = -1
    }
    else(
      this.sort = 'none'
      );
    this.ngOnChanges(event.active);
  }
  ngOnChanges(changes: any) {
    console.log(changes)
    console.log(this.searchString)
    if (this.searchString || this.searchString === "") {
      this.renderTreshold = 30;
      this.getMovieByName();
    } else {
      this.clearMovies();
    }
  }

  public clearMovies(): void {
    this.movies = [];
  }

  public getMovieByName(): void {
    console.log(this.searchString)
    this.movieListService.getMovies(
      this.searchString === "" ? 'undefined' : this.searchString,
      this.renderTreshold,
      this.index,
      this.genreString.length > 0  ? this.genreString : 'none',
      this.ratingNumber > 0 ? this.ratingNumber : 0,
      this.sort ? this.sort : 'none',
      this.sortType ? this.sortType : -1)
      .subscribe(movies => {
      this.movies = movies;
      this.canRenderNew = true;
    });
  }
  ngOnInit() {
    this.getMovieByName();
  }


  public openDialog(data) {
    console.log(data);
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


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.canRenderNew) {
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
        //reached bottom
        this.canRenderNew = false;
        this.renderTreshold += 10;
        this.getMovieByName();
      }
    }
  }
}
