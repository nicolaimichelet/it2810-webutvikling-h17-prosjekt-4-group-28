import {Component, OnInit} from '@angular/core';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import movies from './data-table-demo1-data';
import {PostsService} from "../movies.service";


@Component({
    selector: 'data-table-demo-1',
    providers: [],
    templateUrl: './data-table-demo1.html',
    styleUrls: ['./data-table-demo1.css']
})
export class DataTableDemo1 implements OnInit{

    itemResource: any;
    items = [];
    itemCount = 0;
    movies: any = [];
    constructor(private postsService: PostsService) {
      this.postsService.getAllPosts().subscribe(movies => {
        this.itemResource = new DataTableResource(movies);
      });
    }
// todo: fix this
    reloadItems(params) {
        this.itemResource.count().then(count => this.itemCount = count);
        this.itemResource.query(params).then(items => this.items = items);
    }





  ngOnInit() {
    // Retrieve movies from the API
    this.postsService.getAllPosts().subscribe(movies => {
      this.movies = movies;
    });
  }
    // special properties:

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.name);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }
}
