import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {MockMovies} from './movies.data.mock';

export class MovieDbMock {
  getMovies() {
    let response = new ResponseOptions({
      body: JSON.stringify(MockMovies)
    });
    return Observable.of(new Response(response));
  }
  specificMovie() {
    let response = new ResponseOptions({
      body: JSON.stringify(MockMovies[0])
    });
    return Observable.of(new Response(response));
  }
  getMovieRatings(){
    return true;
  }
}
