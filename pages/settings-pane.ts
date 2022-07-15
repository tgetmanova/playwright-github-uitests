import { Locator, Page } from '@playwright/test';

export class SettingsPane {

    private readonly page: Page;
    private readonly actionItems: Locator
    private readonly emailsItem: Locator

    constructor(page: Page) {
        this.page = page;
        
        this.actionItems = page.locator('li .ActionList-item');
        this.emailsItem = this.actionItems.filter({ hasText: 'Emails' });
    }

    async openEmails() {
        await this.emailsItem.click();
    }
}