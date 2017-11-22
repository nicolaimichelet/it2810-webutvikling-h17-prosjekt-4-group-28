import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import {MatDialog, MatDialogModule} from "@angular/material";
import {Overlay, OVERLAY_PROVIDERS, OverlayContainer, ScrollStrategyOptions} from "@angular/cdk/overlay";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/scrolling";
import {Platform} from "@angular/cdk/platform";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MovieData, MovieDb} from "../../services/movies.service";
import {HttpModule, Http} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";



describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let service: MovieDb;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpModule, RouterTestingModule],
      declarations: [ MovieListComponent ],
      providers: [MovieDb, HttpClient, HttpHandler, MatDialog, Overlay, ScrollStrategyOptions, ScrollDispatcher, Platform, ViewportRuler, OverlayContainer, OVERLAY_PROVIDERS]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(MovieListComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovieDb) as any;
    })
  }));

  const mockMovie: MovieData[] = [
    {
      _id: "d59f23fa",
      Title: 'Leanne Graham',
      Description: 'Bret',
      Rating: 9.0,
      Year: 2017,
      Director : 'Osama Bin Laden',
      Actors : "jeg, deg",
      Rank: 1,
      Genre: "Action"
    }
  ];

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show right number of elements', fakeAsync(() => {
    spy = spyOn(service, 'getMovies').and.returnValue(Promise.resolve(mockMovie));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.lol'))
    expect(elements.length).toBe(3);
  }));


});
