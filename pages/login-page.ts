import { Locator, Page } from '@playwright/test';
import { LoginInfo } from "../data/login-info";

export class LoginPage {
    
    private readonly page: Page;
    private readonly loginLink: any;
    private readonly loginInputField: Locator;
    private readonly passwordInputField: Locator;
    private readonly submitLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.loginLink = page.locator('[href="/login"]');
        this.loginInputField = page.locator('#login_field');
        this.passwordInputField = page.locator('#password');
        this.submitLoginButton = page.locator('[name="commit"]');
    }

    async open() {
        await this.page.goto('https://github.com');
    }

    async login(loginData: LoginInfo) {
        await this.loginLink.click();
        await this.loginInputField.type(loginData.userName);
        await this.passwordInputField.type(loginData.password);
        await this.submitLoginButton.click();
    }
}