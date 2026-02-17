import {Page , Locator} from '@playwright/test'
class AccountPage{
    page :Page
    username: Locator
    password: Locator
    submit: Locator
    logout: Locator
    orders: Locator
    downloads: Locator
    constructor(page: Page){
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.submit = page.locator('button[value="Log in"]');
        this.logout = page.locator('.woocommerce-MyAccount-navigation li a[href*="logout"]');
        this.orders = page.locator('.woocommerce-MyAccount-navigation li a[href*="orders"]');
        this.downloads = page.locator('.woocommerce-MyAccount-navigation li a[href*="downloads"]');
    }

}
export default AccountPage;