// DEBUG:pw:api - it give all steps in the console and also give the locator details 
//                  when it is not able to find the element

import {test , expect} from '@playwright/test'
import HomePage from '../Pages/HomePage';

let page: any
let context: any
test.describe('Home page', () => {
    let homepage : HomePage;
    // test.beforeAll(async ({ browser }) => {
    //     context = await browser.newContext()
        
    //     page = await context.newPage()
    //     homepage   = new HomePage(page);
    //     await page.goto("/")
    //     console.log('Current URL:', page.url());
        
    // })
    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page);
        await page.goto('/');
    });

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
         
         let expectedLinks=["Home", "About", "Shop", "Blog","Contact", "My account"]

         //const navlinks = page.locator('#zak-primary-menu li')
         // if i need to specify the li id should start with some words then specify like this 
         // page.locator('#zak-primary-menu li[id*="menu-item"]')

         //expect(await navlinks.count()).toBe(expectedLinks.length)

         // allTextContents returns array of strings
         // to very the nth element add  homepage.navlinks.nth(3)
         // we can verify first and last also
         // to verify expect(await homepage.navlinks.first().textContent()).toEqual("expectedLinks[0]")
         // to verify expect(await homepage.navlinks.last().textContent()).toEqual("expectedLinks[expectedLinks.length -1]")
         // to  verify expect(await homepage.navlinks.texcontent()).toEqual("expectedLinks[3]")
         
         expect(await homepage.navlinks.allTextContents()).toEqual(expectedLinks)

         // print the names 
         for (let el of await homepage.navlinks.elementHandles()){
            console.log(await el.textContent());

         }
        
    })
    
    
    
})



