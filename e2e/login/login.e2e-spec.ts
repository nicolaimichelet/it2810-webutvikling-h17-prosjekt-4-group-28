import {LoginPage} from './login.po';
import {browser, by, element} from 'protractor';

describe('project4 Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should login user', () => {
    page.navigateTo();
    let username = element(by.css('.form-group input[name=username]'));
    username.sendKeys('matmonsen');
    let password = element(by.css('.form-group input[name=password]'));
    password.sendKeys('yolo');
    page.getSubmitButton().click();
    expect(browser.getCurrentUrl()).toMatch('/profile');
  });
});
