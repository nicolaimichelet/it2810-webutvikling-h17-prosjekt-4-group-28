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

  public renderTreshold = 20;
  canRenderNew = true;
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
      this.renderTreshold = 30;
      this.getMovies();
  }


  public getMovies(): void {
    console.log(this.searchString)
    this.isloading = true
    this.movieListService.getMovies(this).then(movies => {
      this.movies = movies;
      this.canRenderNew = true;
      this.isloading = false
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
    if(this.canRenderNew) {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
        this.canRenderNew = false;
        this.renderTreshold += 10;
        this.getMovies();
      }
    }
  }
}
