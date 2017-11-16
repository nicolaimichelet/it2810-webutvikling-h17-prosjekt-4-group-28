import {Component} from '@angular/core';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent{

  constructor() { }

  genreString: string = 'none';
  ratingNumber: number = 0;
  searchInput: string = '';
}
