import { Page , Locator } from '@playwright/test';
class ContactPage {
    page: Page;
    text: Locator;
    name: Locator;
    email: Locator;
    phoneNumber: Locator;
    message: Locator;
    submitbutn: Locator;
    successMsg: Locator;
    constructor(page: Page) {
        this.page = page;
        this.text = page.locator('text="Send Us Message"')
        this.name = page.locator('.contact-name .input-text')
        this.email = page.locator('.contact-email .input-text')
        this.phoneNumber= page.locator('.contact-phone .input-text')
        this.message= page.locator('.contact-message .input-text')
        this.submitbutn = page.locator('.everest-forms-submit-button')
        this.successMsg = page.locator('.everest-forms-notice--success')
    }

    async submitForm(name: string, email: string, phone: string, message: string) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.phoneNumber.fill(phone);
        await this.message.fill(message);
        await this.submitbutn.click();

        }    
}

export default ContactPage;