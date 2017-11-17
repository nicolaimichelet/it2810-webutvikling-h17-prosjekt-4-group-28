import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";
import {HttpParams} from "@angular/common/http";

//Important to import http.

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  //pass http into constructor
  constructor(private http:Http) { }

  //Here we insert the user into the database
  registerUser(user){
    let headers = new Headers();
    //we need to specify headers with content type and declare json
    headers.append('Content-Type', 'application/json');
    //specify where we want to insert and actually map it into json
    return this.http.post('api/register', user, {headers: headers})
      .map(res => res.json());
  }

  //Authenticate the user, make a post request.
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  //get the profile associated with token
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('api/profile', {headers: headers})
      .map(res => res.json());
  }
  //save the user in local storage as well for the session
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings so we stringify
    this.authToken = token;
    this.user = user;
  }

  //set the token
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  //check if token is there
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  //clear local storage. Set user and token to null
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //Set favorite
  setFavorites(username, movie){
    let headers = new Headers();
    //we need to specify headers with content type and declare json
    headers.append('Content-Type', 'application/json');
    //specify where we want to insert and actually map it into json
    let body = {username: username, title: movie};
    return this.http.post('http://localhost:8084/api/favorite', body)
      .map(res => res.json());
  }

  removeFavorites(username, movie){
    let headers = new Headers();
    //we need to specify headers with content type and declare json
    headers.append('Content-Type', 'application/json');
    //specify where we want to insert and actually map it into json
    let data = {username: username, title: movie};
    return this.http.delete('http://localhost:8084/api/favoriteDelete', {params: {username: username, title: movie}})
      .map(res => res.json());
  }
}
