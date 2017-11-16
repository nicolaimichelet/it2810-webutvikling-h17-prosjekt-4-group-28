import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.css('app-navbar a')).getText();
  }
  getSubmitButton(){
    return element(by.css('form input[type=submit]'));
  }
}
