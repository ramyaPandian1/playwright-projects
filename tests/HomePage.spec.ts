import {test , expect} from '@playwright/test'

test.describe('Home page', () => {
    test('navigate and check the title', async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/")

        await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
        
    })  
    
    // Type of selector
    test('Click on get started button using css selector', async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/")

        await page.locator('#get-started').click()

        // verify the url 
        await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started')
        // OR
        await expect(page).toHaveURL(/.*get-started/)
        
    })

    test('Verify the text using text selector', async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/")

        //verify the text
        const headingText = page.locator('text="Think different. Make different."')
        await expect(headingText).toBeVisible()
    
    })

    test('Verify the home text with both css and text selector', async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/")

        // find the home text
        //let homeText = page.locator('#zak-primary-menu:has-text("Home")')
        let homeText = page.locator('#zak-primary-menu >> text=Home')

        await expect(homeText).toBeVisible()
        await expect(homeText).toHaveText('Home')
    })
    
    test("Verify the search button is visible", async ({ page }) => {
        await page.goto("https://practice.sdetunicorns.com/")

        // locate the search button
        const searchBtn = page.locator('.zak-header-actions--desktop .zak-header-search__toggle')
        await expect(searchBtn).toBeVisible()
    })

    test('Verify the links content', async ({ page }) => {
         await page.goto("https://practice.sdetunicorns.com/")
         let expectedLinks=["Home", "About", "Shop", "blog","Contact", "My account"]

         const navlinks = page.locator('#zak-primary-menu li')

         //expect(await navlinks.count()).toBe(expectedLinks.length)
         expect(await navlinks.allTextContents()).toEqual(expectedLinks)

         // print the names 
         for (let el of await navlinks.elementHandles()){
            console.log(await el.textContent());

         }
        
    })
    
    
    
})



