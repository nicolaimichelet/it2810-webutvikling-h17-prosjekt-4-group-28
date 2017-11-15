import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  genreString: string = 'none';
  @Input('rating') ratingNumber: number = 0;
  searchInput: string = '';
}
