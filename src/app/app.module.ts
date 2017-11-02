import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import { MovieDb } from './movies.service';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {MoviesComponent} from './movies/movies.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';

const appRoutes: Routes = [
  {path:'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'movies', component: MoviesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    MoviesComponent, // Posts Component injected here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
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
    HttpClientModule,
    FormsModule,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    HomeComponent
  ],
  providers: [MovieDb],
  bootstrap: [AppComponent]
})
export class AppModule { }
