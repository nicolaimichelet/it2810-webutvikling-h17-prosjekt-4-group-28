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
    public dialog: MatDialog,
    public movieDb: MovieDb,
  ) { }

  movies: MovieData[];

  public limit = 20;
  bottom = true;
  sort: string = 'none';
  sortType: number = 1;
  @Input() searchString: string;
  @Input() genreString: string;
  @Input() ratingNumber: number;
  dialogResult = '';
  isloading = false

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
  ngOnChanges(changes: any) {
      this.limit = 30;
      this.getMovies();
  }


  public getMovies(): void {
    this.isloading = true
    this.movieDb.getMovies(this).then(movies => {
      this.movies = movies;
      this.bottom = true;
      this.isloading = false;
    });
  }
  ngOnInit() {
    this.getMovies();
  }


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
        this.limit += 10;
        this.getMovies();
      }
    }
  }
}
