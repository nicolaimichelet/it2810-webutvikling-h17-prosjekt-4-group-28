import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MovieData} from "../../services/movies.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
