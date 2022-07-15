import { expect, Locator, Page } from '@playwright/test';

export class TopPane {
    private readonly page: Page;
    private readonly viewProfileAndMoreLink: Locator;
    private readonly profileDisplayNameArea: Locator;
    private readonly menuItems: Locator;
    private readonly settingsItem: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.viewProfileAndMoreLink = page.locator('[aria-label="View profile and more"]');
        this.profileDisplayNameArea = page.locator('//a[contains(text(), "Signed in as ")]/strong');
        this.menuItems = page.locator('a[role="menuitem"]');
        this.settingsItem = this.menuItems.filter({ hasText: 'Settings' })
    }

    async expandProfileMenu() {
        await this.viewProfileAndMoreLink.click();
    }

    async verifyLoggedInAs(userName: String) {
        const userProfileActual = await this.profileDisplayNameArea.textContent();
        expect(userProfileActual, "Unexpected user profile name").toBe(userName);
    }

    async openSettings() {
        await this.settingsItem.click();
    }
}