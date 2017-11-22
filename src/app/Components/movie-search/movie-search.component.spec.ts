import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatSliderModule, MatIconModule, MatDialogModule, MatExpansionModule} from '@angular/material';
import { MovieSearchComponent } from './movie-search.component';
import {MovieListComponent} from "../movie-list/movie-list.component";
import {MovieDb} from "../../services/movies.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ChartComponent} from "../chart/chart.component";
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatSliderModule, MatIconModule, MatDialogModule, MatExpansionModule, ChartsModule, BrowserAnimationsModule],
      declarations: [ MovieSearchComponent, MovieListComponent, ChartComponent],
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
