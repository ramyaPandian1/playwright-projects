import {test , expect , Page} from '@playwright/test'

test.describe('Account page testing', () => {
     
    
    // Here it will open with login state because we are using the storage state 
    // in the config file and we are storing the login state in the global setup file so it 
    // will open with login state and then we can access the different pages without login 
    // again and again

    // But every time it will be in login state but what if we needed to verify the 
    // login functionality then save the notLoggedinstate and use it ( used in accountpagespec.ts)

    test('Access orders ', async ({page}) => {
        await page.goto("/my-account/")
        await expect(page.locator(' li a[href*="logout"]')).toBeVisible()

        await page.locator('li a[href*="orders"]').click()
        await expect(page).toHaveURL(/.*orders.*/)

        
    })

    test('Access downloads ', async ({page}) => {
        await page.goto("/my-account/")
        await expect(page.locator(' li a[href*="logout"]')).toBeVisible()
        await page.locator('li a[href*="downloads"]').click()
        await expect(page).toHaveURL(/.*downloads.*/)
        
    })
    
 
})
