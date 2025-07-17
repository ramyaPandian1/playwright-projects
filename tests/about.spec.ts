import { test ,expect} from "playwright/test";

test.describe('About page', () => {
    test('Verify the tile of about page', async ({ page }) => {
        // navigate to url
        await page.goto("https://practice.sdetunicorns.com/about/")

        // verify the title
        await expect(page).toHaveTitle("About – Practice E-Commerce Site")
    })
    
})
