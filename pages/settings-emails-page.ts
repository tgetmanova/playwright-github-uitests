import { Locator, Page } from '@playwright/test';

export class SettingsEmailsPage {
    private readonly page: Page;
    private readonly emailAddField: Locator
    private readonly submitButtons: Locator
    private readonly submitNewEmailButton: Locator

    constructor(page: Page) {
        this.page = page;
        
        this.emailAddField = this.page.locator('#email');
        this.submitButtons = page.locator('button[type="submit"]');
        this.submitNewEmailButton = this.submitButtons.filter({ hasText: 'Add' });
    }

    async fillNewEmailField(email: string) {
        await this.emailAddField.type(email);
    }

    async submitNewEmail() {
        await this.submitNewEmailButton.click();
    }
}