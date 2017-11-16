import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/register');
  }

  getParagraphText() {
    return element(by.css('app-navbar a')).getText();
  }
  getSubmitButton(){
    return element(by.css('form input[type=submit]'));
  }
}
