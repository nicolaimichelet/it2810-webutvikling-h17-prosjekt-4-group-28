import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import { PostsService } from './movies.service';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import {HttpModule} from '@angular/http';
import { PostsComponent } from './movies/movies.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

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
    PostsComponent // Posts Component injected here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
