import {test , expect } from '@playwright/test'

test.describe('About page',()=>{
    test('naviage and check the title', async({page})=>{

        await page.goto("https://practice.sdetunicorns.com/about/")

        await expect(page).toHaveTitle("About – Practice E-Commerce Site")

    })

})