import { chromium, FullConfig } from "@playwright/test";

async function globalsetup(config : FullConfig){

    // this is outside the playwright test so we cannot use the page fixture here so we need 
    // to create our own page and then we can use that page to login and then we can use 
    // that page in our tests

    const browser = await chromium.launch()
    const page = await browser.newPage()
    

    await page.goto("https://practice.sdetunicorns.com/my-account/")
    
    // store the loggedout state 
    await page.context().storageState({ path : "Loggedoutstate.json"})

    // Login
    await page.locator('#username').fill("practiceuser1")
    await page.locator('#password').fill("PracticePass1!")
    await page.locator('button[value="Log in"]').click()
    //expect(accountpage.logout).toBeVisible() 

    /* now we have to store the sighned in state in the session storage so that we can use 
      that session in our tests without login again and again here we are getting the storage 
      state and then we are storing that storage state in the file and then we can use that 
      file in our tests to access the session without login again and again */

    await page.context().storageState({ path : "Logginstate.json"})
    // close the browser after login and then we can use the session storage to access the 
    // session in our tests
    await browser.close()

}

export default globalsetup;