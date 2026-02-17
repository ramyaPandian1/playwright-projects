import {test , expect } from '@playwright/test'

test.describe('About page',()=>{
    test.beforeEach('navigate and check the title', async({page})=>{

        await page.goto("/about/")

        await expect(page).toHaveTitle("About – Practice E-Commerce Site")

    })

})