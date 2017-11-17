import { browser, by, element } from 'protractor';

export class NavBarPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-navbar a')).getText();
  }
}
