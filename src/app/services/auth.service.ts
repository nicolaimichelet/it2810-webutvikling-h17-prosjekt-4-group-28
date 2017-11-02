import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

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

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8084/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
