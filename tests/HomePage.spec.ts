import {test , expect} from '@playwright/test'
import HomePage from '../Pages/HomePage';

let page: any
let context: any
test.describe('Home page', () => {
    let homepage : HomePage;
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        
        page = await context.newPage()
        homepage   = new HomePage(page);
        await page.goto("https://practice.sdetunicorns.com")
        console.log('Current URL:', page.url());
        
    })
    test('navigate and check the title', async ({ page }) => {
        //await page.goto("https://practice.sdetunicorns.com/")
        

        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
        
    })  
    
    // Type of selector
    test('Click on get started button using css selector', async ({ page }) => {
        homepage = new HomePage(page);
        //await page.goto("https://practice.sdetunicorns.com/")
        

        await homepage.getstartedButton.click()

        // verify the url 
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')
        // OR
        await expect(page).toHaveURL(/.*get-started/)
        
    })

    test('Verify the text using text selector', async ({ page }) => {
        
        //verify the text
        //const headingText = page.locator('text="Think different. Make different."')
        await expect(homepage.headingText).toBeVisible()
    
    })

    test('Verify the home text with both css and text selector', async ({ page }) => {
        

        // find the home text
        //let homeText = page.locator('#zak-primary-menu:has-text("Home")')
        //let homeText = page.locator('#zak-primary-menu >> text=Home')

        await expect(homepage.homeText).toBeVisible()
        await expect(homepage.homeText).toHaveText('Home')
    })
    
    test("Verify the search button is visible", async ({ page }) => {
        

        // locate the search button
        //const searchBtn = page.locator('.zak-header-actions--desktop .zak-header-search__toggle')
        await expect(homepage.searchBtn).toBeVisible()
    })

    test('Verify the links content', async ({ page }) => {
         
         let expectedLinks=["Home", "About", "Shop", "blog","Contact", "My account"]

         //const navlinks = page.locator('#zak-primary-menu li')

         //expect(await navlinks.count()).toBe(expectedLinks.length)
         expect(await homepage.navlinks.allTextContents()).toEqual(expectedLinks)

         // print the names 
         for (let el of await homepage.navlinks.elementHandles()){
            console.log(await el.textContent());

         }
        
    })
    
    
    
})



