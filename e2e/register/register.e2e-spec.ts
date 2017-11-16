import {RegisterPage} from './register.po';
import {browser, by, element} from 'protractor';

describe('project4 Register', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should register user', () => {
    page.navigateTo();
    let newUser = element(by.css('.form-group input[name=name]'));
    newUser.sendKeys('lars monsen');
    let newUsername = element(by.css('.form-group input[name=username]'));
    newUsername.sendKeys('matmonsen');
    let newPassword = element(by.css('.form-group input[name=password]'));
    newPassword.sendKeys('yolo');
    page.getSubmitButton().click();
    expect(browser.getCurrentUrl()).toMatch('/login')
  });
  it('should tell you to fill in all fields', () => {
    page.navigateTo();
    const newUser = element(by.css('.form-group input[name=name]'));
    newUser.sendKeys('per');
    const newPassword = element(by.css('.form-group input[name=password]'));
    newPassword.sendKeys('per');
    page.getSubmitButton().click();
    expect(element(by.css('.alert')).getText()).toEqual('Something went wrong!');
  });
  it('should tell you user already taken', () => {
    page.navigateTo();
    const oldUser = element(by.css('.form-group input[name=name]'));
    oldUser.sendKeys('lars monsen');
    const oldUsername = element(by.css('.form-group input[name=username]'));
    oldUsername.sendKeys('matmonsen');
    const oldPassword = element(by.css('.form-group input[name=password]'));
    oldPassword.sendKeys('yolo');
    page.getSubmitButton().click();
    expect(element(by.css('.alert')).getText()).toEqual('Something went wrong!');
  });


});
