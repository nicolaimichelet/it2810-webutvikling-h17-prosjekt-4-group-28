import {MovieListPage} from './movie-search.po';
import {browser, by, element, protractor} from 'protractor';

describe('project4 movie-module-list', () => {
  let page: MovieListPage;

  beforeEach(() => {
    page = new MovieListPage();
  });

  it('should show list', () => {
    page.navigateTo();
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();

    browser.wait(EC.presenceOf(element(by.css('.lol'))), 10000);
    const tableCount = element.all(by.css('.lol')).count();
    expect(tableCount).toBe(30);


  });
  it('should show search query', () => {
    page.navigateTo();
    var EC = protractor.ExpectedConditions;
    browser.waitForAngular();
    const newSearch = element(by.css('.input-search-wrapper input[type=text]'));
    newSearch.sendKeys('Prometheus')
    browser.wait(EC.presenceOf(element(by.css('.lol'))), 10000);
    const tableC = element(by.css('.lol')).getText();
    expect(tableC).toBe('Prometheus');


  });
})
