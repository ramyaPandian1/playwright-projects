import { Page , Locator } from "@playwright/test"

class BlogPage {
    page: Page
    recentpost: Locator
    posts: Locator
    constructor(page : Page) {
        this.page = page
        this.recentpost = page.locator('#recent-posts-3 .widget-title')
        this.posts = page.locator('#recent-posts-3 ul li')
    }

    async totalNumberofPosts() {
        const elements = await this.posts.elementHandles()
        let postcontent : any
        for (let el of elements){
            postcontent = (await el.textContent())?.trim();
            console.log(postcontent);
            console.log(postcontent.length);
        
        }
        return postcontent.length


    }

    
}

export default BlogPage