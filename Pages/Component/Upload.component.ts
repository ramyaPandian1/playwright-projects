import { Page , Locator } from '@playwright/test';
class UploadComponent {
    private page: Page;
    cartLink: Locator;
    uploadInput: string;
    upload: Locator;
    successtxt: Locator;
    constructor(page : Page){
        this.page = page;
        this.cartLink = page.locator('.zak-menu-item-cart')
        this.uploadInput = 'input#upfile_1'
        this.upload = page.locator('#upload_1')
        this.successtxt = page.locator('#wfu_messageblock_header_1_1')

    }
    async uploadFile(filePath: string) {
        await this.page.setInputFiles('#upfile_1', filePath);
        console.log("Check for visisble :     ")
        //console.log(await page.locator('input#upfile_1').isVisible()); // should print true

        // click on submit button : here click on upload button
        await this.upload.waitFor({ state: 'visible', timeout: 10000 })
        await this.upload.click();
    }

}

export default UploadComponent;