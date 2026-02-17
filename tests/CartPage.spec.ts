// Upload a file in cart page and verify the file is uploaded successfully
// steps 
// 1. open URL :  await page.goto("https://practice.automationbro.com/cart/");
// 2 . Provie the file path :  const filePath = path.join(__dirname, '../data/logotitle.png');
// 3. uoload the file : await page.setInputFiles('input#upfile_1', filePath);
// 4. Click on the submit button  await page.locator('#upload_1').click();
// 5. Verify the file is uploaded successfully :
                    // await expect(page.locator('#wfu_messageblock_header_1_1'))
                    //       .toContainText('uploaded successfully');
                    //   })

// This file contains the scenario 
// 1. like when the button is hidden and we need to make it visible 
// and then click on the button and verify the file is uploaded successfully using "DOM manipulation"

// 2. Condition timeout : waitFor({ state: 'visible', timeout: 10000 })

// 3. assertion wait : expect(locator).toContainText('uploaded successfully', {timeout: 10000})


import {test , expect } from '@playwright/test'
import path from 'path';
import CartPage from '../Pages/CartPage';

let page: any
let context: any

test.describe('Contact page', () => {
    let cartPage: CartPage;

    const filename = ["Playwright.png", "Vela-Murugan.jpg"]

    test.beforeAll(async ({ browser }) => {
        //cartPage = new CartPage(page);
        context = await browser.newContext()
        
        page = await context.newPage()
        cartPage = new CartPage(page);
        // Since in base url its updated we can just use "/" instead of full url
        //await page.goto("https://practice.sdetunicorns.com")
        await page.goto("/")
        console.log('Current URL:', page.url());
        //const cartLink = page.locator('.zak-menu-item-cart')

        await Promise.all([
        page.waitForURL(/.*cart.*/),
        cartPage.uploadComponent().cartLink.first().click()
        ]);
        //await cartLink.first().click()

       await expect(page).toHaveTitle("Cart – Practice E-Commerce Site")
       await expect(page).toHaveURL(/.*cart.*/);
        
    })

    // parametrizeed test to upload multiple files

    for (const file of filename){
        test(`Upload a file ${file} file `, async()=>{
        cartPage = new CartPage(page);
        console.log('Current URL:', page.url());
        
        // Provide the file path
        const filepath = path.join(__dirname, `../data/Images/${file}`);
        console.log("Uploading file from:", filepath);

        // upload a file : here we need to search for the input type = file element here 
        // select file has the input type has "file" 
    
        console.log(await page.locator('input#upfile_1').isVisible()); // should print true
        

        //Using DOM manipulation to make the file input visible and then upload
        
        // we are making the classname has null to see the button 

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

        // Condition wait : wait for the success message : Here it will not wait for 10000 ms instead it will 
        // wait until the success message is visible and then it will move to next step
        await page.pause()
        await cartPage.uploadComponent().successtxt.waitFor({ state: 'visible', timeout: 10000 })
        // verify the file is uploaded
        

        // assertion wait : wait for the success message to contain the text "uploaded successfully"
        //  : here it will wait for 10000 ms until the text is visible and then it will verify the text
        await expect(cartPage.uploadComponent().successtxt).toContainText('uploaded successfully', {timeout: 10000});
    })  
    }
    
   test.skip('Upload a file  ', async()=>{
        cartPage = new CartPage(page);
        console.log('Current URL:', page.url());
        
        // Provide the file path
        const filepath = path.join(__dirname, '../data/Images/Playwright.png');
        console.log("Uploading file from:", filepath);

        // upload a file : here we need to search for the input type = file element here 
        // select file has the input type has "file" 
    
        console.log(await page.locator('input#upfile_1').isVisible()); // should print true
        

        //Using DOM manipulation to make the file input visible and then upload
        
        // we are making the classname has null to see the button 

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

        // Condition wait : wait for the success message : Here it will not wait for 10000 ms instead it will 
        // wait until the success message is visible and then it will move to next step

        await cartPage.uploadComponent().successtxt.waitFor({ state: 'visible', timeout: 10000 })
        // verify the file is uploaded
        await page.pause()

        // assertion wait : wait for the success message to contain the text "uploaded successfully"
        //  : here it will wait for 10000 ms until the text is visible and then it will verify the text
        await expect(cartPage.uploadComponent().successtxt).toContainText('uploaded successfully', {timeout: 10000});
    })    
})
