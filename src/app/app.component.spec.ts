import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CdkTableModule} from '@angular/cdk/table';
import {RouterModule, Routes} from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { MovieComponent } from './Components/movie-module/movie-module.component';
import {AuthGuard} from "./guards/auth.guard";
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { MovieSearchComponent } from './Components/movie-search/movie-search.component';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import {NgModule, OnInit} from '@angular/core';
import { MovieDb } from './services/movies.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartComponent}  from './Components/chart/chart.component';
import {HomeComponent}  from './Components/home/home.component';
import { ChartsModule } from 'ng2-charts';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatExpansionPanel,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule} from '@angular/material';
import 'hammerjs';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,CdkTableModule, FlashMessagesModule, MatIconModule, MatSliderModule,
        HttpModule, RouterModule, MatExpansionModule, RouterTestingModule, ChartsModule, BrowserModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [
        AppComponent,
        ProfileComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        MovieComponent,
        MovieListComponent,
        MovieSearchComponent,
        ChartComponent,
        HomeComponent,
      ],
      providers: [MovieDb,ValidateService, AuthService, AuthGuard, RouterModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'MOVIE DATABASE'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MOVIE DATABASE');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
