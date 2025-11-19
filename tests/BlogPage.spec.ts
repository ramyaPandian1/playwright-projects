import {test , expect } from '@playwright/test'
import BlogPage from '../Pages/BlogPage'

let page: any
let context: any

test.describe('Contact page', () => {
    let blogPage: BlogPage

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        
        page = await context.newPage()
        blogPage = new BlogPage(page)
        await page.goto("https://practice.sdetunicorns.com")
        console.log('Current URL:', page.url());
        const contactLink = page.locator('#zak-primary-menu >> text=Blog')
        await contactLink.click()

        expect(page).toHaveTitle("Blog – Practice E-Commerce Site")
        
    })
    
   test('locate the recent post ', async()=>{
        console.log('Current URL:', page.url());
        await expect(page).toHaveURL(/.*blog.*/);
        //await page.pause()

        // Check page title
        await expect(page).toHaveTitle("Blog – Practice E-Commerce Site");        
        //let recentpost = page.locator('#recent-posts-3 .widget-title')
        expect(await blogPage.recentpost.textContent()).toBe('Recent Posts')

        // get the length of the recent posts and equal to 5 
        //let posts = page.locator('#recent-posts-3 ul li')
        expect(await blogPage.posts.count()).toBe(5);

        // get the length of each post is minimun of character is  10
        // for (let el of await blogPage.posts.elementHandles()){
        //     let postcontent = (await el.textContent()).trim();
        //     console.log(postcontent);
        //     console.log(postcontent.length);
        //     expect(postcontent.length).toBeGreaterThan(10)
        // }

        const totalLength = await blogPage.totalNumberofPosts()
        expect(totalLength).toBeGreaterThan(10)
    })    
})
