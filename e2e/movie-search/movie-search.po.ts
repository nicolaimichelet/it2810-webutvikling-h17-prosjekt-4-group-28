import { browser, by, element } from 'protractor';

export class MovieListPage {
  navigateTo() {
    return browser.get('/home', 10000);
  }
}
