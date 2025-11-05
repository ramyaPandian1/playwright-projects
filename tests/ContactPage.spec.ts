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
        await page.locator('.contact-name .input-text').fill('Ramyaa'); 
        await page.locator('.contact-email .input-text').fill('abc@gmail.com');
        await page.locator('.contact-phone .input-text').fill('123456789'); 
        await page.locator('.contact-message .input-text').fill('Testing the contact form'); 

        // add soft assettion - here it will skip and execute even this assertion fails
        await expect.soft(page.locator('.contact-message .input-text')).toHaveText('the contact form1')


        let submitbutn = page.locator('.everest-forms-submit-button')
        let successMsg = page.locator('.everest-forms-notice--success')
        // let submibtn = page.lcocator('button[type=submit]') 
        await submitbutn.click()

        // to check there are no errors after submitting the form 
        //: it checks that number of error should be less than 1 it also inclused soft errors also 
        expect(test.info().errors.length).toEqual([1])

        await expect(successMsg).toBeVisible({ timeout: 10000 })
        expect(await successMsg.textContent()).toHaveText('Thanks for contacting us! We will be in touch with you shortly')
    })

    // test('Click on the submitbutton and verify the message display', async () => {
    //     let submitbutn = page.locator('.everest-forms-submit-button')
    //     let successMsg = page.locator('.everest-forms-notice--success') 
    //     await submitbutn.click()
    //     expect(submitbutn.textContent()).toBe('Processing...')
    //     await expect(successMsg).toBeVisible({ timeout: 10000 })
    //     expect(await successMsg.textContent()).toContain('Thanks for contacting us! We will be in touch with you shortly')
    //     await page.pause();
        
    // })
    
    
    
})
