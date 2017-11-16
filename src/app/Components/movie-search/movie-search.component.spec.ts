import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatSliderModule, MatIconModule, MatDialogModule} from '@angular/material';
import { MovieSearchComponent } from './movie-search.component';
import {MovieListComponent} from "../movie-list/movie-list.component";
import {MovieDb} from "../../services/movies.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatSliderModule, MatIconModule, MatDialogModule],
      declarations: [ MovieSearchComponent, MovieListComponent ],
      providers: [MovieDb, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    component.searchInput = "pro";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
