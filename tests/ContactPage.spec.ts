import {test , expect } from '@playwright/test'

let page: any
let context: any

test.describe('Contact page', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        
        page = await context.newPage()
        await page.goto("https://practice.sdetunicorns.com")
        console.log('Current URL:', page.url());
        const contactLink = page.locator('#zak-primary-menu >> text=Contact')
        await contactLink.click()

        expect(page).toHaveTitle("Contact – Practice E-Commerce Site")
        
    })
    
   test('Verify the send message text is visible', async()=>{
        console.log('Current URL:', page.url());
        await expect(page).toHaveURL(/.*contact.*/);

        // Check page title
        await expect(page).toHaveTitle("Contact – Practice E-Commerce Site");        
        let text = page.locator('text="Send Us Message"')
        await expect(text).toBeVisible()

    })
    
    test('Fill the form', async () => { 
        await page.getByLabel('Name').first().fill('Ramyaa');
        await page.getByRole('textbox',{name: 'Email'}).fill('abc@gmail.com')
        await page.getByLabel('Phone').fill('12345678')
        await page.getByLabel('Message').fill('Testing the contact form') 
    })

    test('Click on the submitbutton and verify the message display', async () => {
        let submitbutn = page.locator('.everest-forms-submit-button')
        let successMsg = page.locator('.everest-forms-notice--success') 
        await submitbutn.click()
        expect(submitbutn.textContent()).toBe('Processing...')
        await expect(successMsg).toBeVisible({ timeout: 10000 })
        expect(await successMsg.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly')
        await page.pause();
        
    })
    
    
    
})
