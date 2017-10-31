import { Component, OnInit } from '@angular/core';
import { PostsService } from '../movies.service';
import { MatDialog } from "@angular/material";
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],

})
export class PostsComponent implements OnInit {
  // instantiate movies to an empty array
  movies: any = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve movies from the API
    this.postsService.getAllPosts().subscribe(movies => {
      this.movies = movies;
    });
  }

}
