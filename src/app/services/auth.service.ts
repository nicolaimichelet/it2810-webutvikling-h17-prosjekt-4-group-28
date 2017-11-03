import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";

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
    return this.http.post('http://localhost:8084/api/register', user, {headers: headers})
      .map(res => res.json());
  }

  //Authenticate the user, make a post request.
  //if succesful, return token and user info
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8084/api/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8084/api/profile', {headers: headers})
      .map(res => res.json());
  }


  storeUserData(token, user){
    //save in local storage
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings so we stringify
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  //check token is there
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
