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
    
    
})



