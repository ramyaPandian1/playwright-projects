import {test , expect } from '@playwright/test'
import path from 'path';
import CartPage from '../Pages/CartPage';

let page: any
let context: any

test.describe('Contact page', () => {
    let cartPage: CartPage;

    test.beforeAll(async ({ browser }) => {
        cartPage = new CartPage(page);
        context = await browser.newContext()
        
        page = await context.newPage()
        cartPage = new CartPage(page);
        await page.goto("https://practice.sdetunicorns.com")
        console.log('Current URL:', page.url());
        //const cartLink = page.locator('.zak-menu-item-cart')

        await Promise.all([
        page.waitForNavigation(),
        cartPage.uploadComponent().cartLink.first().click()
        ]);
        //await cartLink.first().click()

       await expect(page).toHaveTitle("Cart – Practice E-Commerce Site")
       await expect(page).toHaveURL(/.*cart.*/);
        
    })
    
   test('Upload a file  ', async()=>{
        cartPage = new CartPage(page);
        console.log('Current URL:', page.url());
        
        // Provide the file path
        const filepath = path.join(__dirname, '../data/Images/Playwright.png');
        console.log("Uploading file from:", filepath);

        // upload a file : here we need to search for the input type = file element here 
        // select file has the input type has "file" 
    
        console.log(await page.locator('input#upfile_1').isVisible()); // should print true
        

        //Using DOM manipulation to make the file input visible and then upload
        
        // await page.evaluate(() => {
        //     const fileInput = document.querySelector('input#upfile_1') as HTMLElement;
        //     if (fileInput) {
        //         fileInput.className = "";
        //     }
        // });
        // *********************************************************************8
        // await page.setInputFiles('#upfile_1', filepath);
        // console.log("Check for visisble :     ")
        // console.log(await page.locator('input#upfile_1').isVisible()); // should print true

        // // click on submit button : here click on upload button
        // await cartPage.uploadComponent().upload.waitFor({ state: 'visible', timeout: 10000 })
        // await cartPage.uploadComponent().upload.click();

        // ***************************************************************************************

        await cartPage.uploadComponent().uploadFile(filepath);
        // wait for the success message
        await cartPage.uploadComponent().successtxt.waitFor({ state: 'visible', timeout: 10000 })
        // verify the file is uploaded
        await page.pause()
        await expect(cartPage.uploadComponent().successtxt).toContainText('uploaded successfully', {timeout: 10000});
    })    
})
