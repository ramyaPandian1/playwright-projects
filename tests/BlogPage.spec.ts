import {test , expect } from '@playwright/test'

let page: any
let context: any

test.describe('Contact page', () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        
        page = await context.newPage()
        await page.goto("https://practice.sdetunicorns.com")
        console.log('Current URL:', page.url());
        const contactLink = page.locator('#zak-primary-menu >> text=Blog')
        await contactLink.click()

        expect(page).toHaveTitle("Blog – Practice E-Commerce Site")
        
    })
    
   test('locate the recent post ', async()=>{
        console.log('Current URL:', page.url());
        await expect(page).toHaveURL(/.*blog.*/);
        await page.pause()

        // Check page title
        await expect(page).toHaveTitle("Blog – Practice E-Commerce Site");        
        let recentpost = page.locator('#recent-posts-3 .widget-title')
        expect(await recentpost.textContent()).toBe('Recent Posts')

        // get the length of the recent posts
        let posts = page.locator('#recent-posts-3 ul li')
        expect(await posts.count()).toBe(5);

        // get the length of each post minimun is 10
        for (let el of await posts.elementHandles()){
            console.log(await el.textContent());
            console.log(await el.textContent().length);
         }
    })
    
    
    
    
})
