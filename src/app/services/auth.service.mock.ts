import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {MockMovies} from './movies.data.mock';

const profile = {
  user: {
    username: "per",
    favorites: ["hackergdf", "gotg"]
  }
};

export class AuthServiceMock {
  registerUser(user){return true}

  authenticeUser(user){return true}

  public getProfile(): Observable<Response>{
    let response = new ResponseOptions({
      body: JSON.stringify(profile)
    });
    return Observable.of(new Response(response));
  }
  storeUserData(token, user){

  }
  loadToken(){}

  loggedIn(){ return true}

  logout(){}

  setFavorites(username,movie){}

  removeFavorite(username,movie){}
}
