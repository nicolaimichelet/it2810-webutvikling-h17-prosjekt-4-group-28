import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MovieComponent } from './movie-module.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatIconModule} from "@angular/material";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/auth.service";
import {MovieData} from "../../services/movies.service";
import {HttpModule, Http} from "@angular/http";
import {By} from "@angular/platform-browser";


describe('MovieComponent', () => {
  let component: MovieComponent;
  let service: AuthService;
  let spy: any;
  let fixture: ComponentFixture<MovieComponent>;
  let authService: AuthService;


  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, RouterTestingModule, MatDialogModule, HttpModule],
      declarations: [ MovieComponent ],
      providers: [ AuthService, {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA}]
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(MovieComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuthService) as any;
      component.data = mockMovie[0];
    })
  }));

  const mockMovie: MovieData[] = [
  {
      '_id': "d59f23fa",
      'Title': 'Leanne Graham',
      'Description': 'Bret',
      'Rating': 9.0,
      'Year': 2017,
      'Director' : 'Osama Bin Laden',
      'Actors' : "jeg, deg",
      'Rank': 1,
      'Genre': "Action"
    },
    {
      '_id': "d59f23fa",
      'Title': 'Leanne Graham',
      'Description': 'Bret',
      'Rating': 9.0,
      'Year': 2017,
      'Director' : 'Osama Bin Laden',
      'Actors' : "jeg, deg",
      'Rank': 1,
      'Genre': "Action"
    }
  ];

  beforeEach(() => {
    fixture.detectChanges();

  });

  it('should get Title', () => {
    expect(component.data.Title).toBe('test modal');
  });
  it('should set user', () => {
    component.ngOnInit();
    tick();
    expect(component.data.username).toEqual('per');
  });



  it('should show button to route to login on module, if not logged in', fakeAsync(() => {
    spy = spyOn(service, 'loggedIn').and.returnValue(false);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#logInToFavorite')).nativeElement;
    expect(button.value).toBe('Please log in to favorite a movie')
  }));

  it('should show favorite button if logged in', fakeAsync(() => {
    spy = spyOn(service, 'loggedIn').and.returnValue(true);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let favButton = fixture.debugElement.query(By.css('.btn-info')).nativeElement;
    expect(favButton.isPresent).toBeTruthy();
  }))
});
