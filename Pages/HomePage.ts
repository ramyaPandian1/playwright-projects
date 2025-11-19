import {Page , Locator} from '@playwright/test';
class HomePage{
    page: Page;
    getstartedButton: Locator;
    headingText: Locator;
    homeText: Locator;
    searchBtn: Locator;
    navlinks: Locator;
    constructor(page: Page){
        this.page = page;
        this.getstartedButton = page.locator('#get-started')
        this.headingText = page.locator('text="Think different. Make different."')
        this.homeText = page.locator('#zak-primary-menu >> text=Home')
        this.searchBtn = page.locator('.zak-header-actions--desktop .zak-header-search__toggle')
        this.navlinks = page.locator('#zak-primary-menu li')
}
  

}

export default HomePage;