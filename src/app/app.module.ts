import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {RouterModule, Routes} from "@angular/router";
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';

const appRoutes: Routes = [
  {path:'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
