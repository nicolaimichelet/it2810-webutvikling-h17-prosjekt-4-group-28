import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import { PostsService } from './movies.service';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import {HttpModule} from '@angular/http';
import { PostsComponent } from './movies/movies.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {DataTableDemo1} from './demo1/data-table-demo1';
import {DataTableModule } from 'angular-4-data-table-bootstrap-4';

const ROUTES = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: PostsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent, // Posts Component injected here
    DataTableDemo1
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    DataTableModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
