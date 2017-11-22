import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MovieData} from '../../services/movies.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {MovieDb} from '../../services/movies.service';
import {MovieComponent} from '../movie-module/movie-module.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public movieDb: MovieDb,
  ) { }

  movies: MovieData[];

  public limit = 20;
  private skip = 0;
  bottom = true;
  sort: string = 'none';
  sortType: number = 1;
  @Input() searchString: string;
  @Input() genreString: string;
  @Input() ratingNumber: number;
  dialogResult = '';
  isloading = false


  // Called by the matSort titles
  // changed to value for mongodb
  sortData(event){
    this.sort = event.active;
    if (event.direction === 'asc'){
      this.sortType = 1;
    }
    else if(event.direction === 'desc'){
      this.sortType = -1;
    }
    else(
      this.sort = 'none'
      );
    this.ngOnChanges(event.active);
  }

  // Fires when there is a change in input from movie-list
  ngOnChanges(changes: any) {
      this.skip = 0
      this.limit = 30;
      this.movies = [];
      this.getMovies();
  }

  // call for getting movies based on query
  public getMovies(): void {
    this.isloading = true
    this.movieDb.getMovies(this).then(movies => {
      this.movies = this.movies.concat(movies);
      this.bottom = true;
      this.isloading = false;
    });
  }
  ngOnInit() {
    this.getMovies();
  }

  // Opens movie-module with data
  public openDialog(data) {
    console.log(data);
    this.movieDb.specificMovie(data.Title).then( data => {
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
    if(this.bottom) {
      if(window.innerHeight + window.scrollY >= document.body.scrollHeight-100) {
        this.bottom = false;
        this.skip = this.limit;
        this.limit = 10;
        this.getMovies();
      }
    }
  }
}
