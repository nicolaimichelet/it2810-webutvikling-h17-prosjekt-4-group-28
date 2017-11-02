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

}
