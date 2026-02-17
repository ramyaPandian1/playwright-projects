import {test , expect , Page} from '@playwright/test'
import AccountPage from '../Pages/AccountPage'

test.describe.serial('Account page testing', () => {
    let accountpage : AccountPage
    let page : Page
    test.use({ storageState : "Loggedoutstate.json" }) // here we are using the storage state which we have created in the global setup file and then we can use that storage state in our tests to access the session without login again and again

    /* here it will run paralle but every time it will login means if i want to test another 2 links 
    // again it will login again and again so to avoid that we can use beforeAll and afterAll to login once and logout once */


    // test.beforeEach( async ({ page }) => {
    //     accountpage = new AccountPage(page)
    //     await page.goto("/my-account/")
    //     await expect(page).toHaveTitle("My account – Practice E-Commerce Site") 
    //     await accountpage.username.fill("practiceuser1")
    //     await accountpage.password.fill("PracticePass1!")
    //     await accountpage.submit.click()
    //     expect(accountpage.logout).toBeVisible()  
    // })

    /* here in before all the content and page fixture will not work in before all for this we need to use 
    browser.newcontext() or newpage 
    like we are loggin in once but we need to access different pages also it will open in 2 browser it does know 
    who should i give my sesstion to which browser it can give to one of then.
    Here we can run in serial manner ( describe.serial) not paralle
    
    Disadvantage : Here it will run serial manner only we need to run in parallel to make efficiency for 
    that we have ***  "signedin role option"***    */
    test.beforeAll( async ({ browser }) => {
        // here we are creating the new browser and new page and then we are passing the page to the account page and then we are login once and then we can access the different pages without login again and again
        
        page = await browser.newPage()
        accountpage = new AccountPage(page)

        await page.goto("/my-account/")
        await expect(page).toHaveTitle("My account – Practice E-Commerce Site") 
        await accountpage.username.fill("practiceuser1")
        await accountpage.password.fill("PracticePass1!")
        await accountpage.submit.click()
        expect(accountpage.logout).toBeVisible()  
    })

    test('Access orders ', async () => {
        await accountpage.orders.click()
        await expect(page).toHaveURL(/.*orders.*/)

        
    })

    test('Access downloads ', async () => {
        await accountpage.downloads.click()
        await expect(page).toHaveURL(/.*downloads.*/)
        
    })
    
 
})
