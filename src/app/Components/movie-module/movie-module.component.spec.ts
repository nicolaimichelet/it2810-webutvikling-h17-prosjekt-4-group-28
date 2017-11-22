import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { MovieComponent } from './movie-module.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/auth.service';
import {AuthServiceMock} from '../../services/auth.service.mock';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let authService: AuthService;


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      imports: [
        MatIconModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA}, {provide: AuthService, useClass: AuthServiceMock}],
    });
    component = TestBed.createComponent(MovieComponent).componentInstance;
    authService = TestBed.get(AuthService);
    component.data = {
      '_id': 0,
      'Title': 'test modal',
      'Description': 'The craziest plot ever',
      'Runtime (Minutes)': '120',
      'Actors': 'Hahah, none',
      'Director': 'Spielberg',
      'Genre': 'Adventure',
      'Year': 2070,
    };
  });

  it('should get Title', () => {
    expect(component.data.Title).toBe('test modal');
  });
  it('should set user', () => {
    component.ngOnInit();
    tick();
    expect(component.data.username).toEqual('per');
  });
});
