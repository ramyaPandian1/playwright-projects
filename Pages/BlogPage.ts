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
    
}

export default BlogPage