import {NavBarPage} from './navbar.po';

describe('project4 Navbar', () => {
  let page: NavBarPage;

  beforeEach(() => {
    page = new NavBarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('AnanAS Moviedb');
  });
});
