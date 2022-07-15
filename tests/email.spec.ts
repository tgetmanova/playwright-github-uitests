import { test, expect } from '@playwright/test';
import { GithubClient } from '../util/github-client';
import { GithubEmail } from '../data/github-email';
import { faker } from '@faker-js/faker';

import config from '../config.json';

import { LoginPage } from '../pages/login-page';
import { TopPane } from '../pages/top-pane';
import { SettingsPane } from '../pages/settings-pane';
import { SettingsEmailsPage } from '../pages/settings-emails-page';

const githubClient = new GithubClient();

let loginPage: LoginPage;
let topPane: TopPane;
let settingsPane: SettingsPane;
let emailsPage: SettingsEmailsPage;

test.beforeAll(async ({ browser }) => {

  let page = await browser.newPage();

  loginPage = new LoginPage(page);
  topPane = new TopPane(page);
  settingsPane = new SettingsPane(page);
  emailsPage = new SettingsEmailsPage(page);
});

test('Add new email address and verify it is saved via API', async () => {

  const expectedEmail = faker.internet.exampleEmail(faker.name.firstName(), faker.name.lastName());

  await loginPage.open();
  await loginPage.login(config.loginInfo);

  await topPane.expandProfileMenu();
  await topPane.verifyLoggedInAs(config.loginInfo.displayName);
  await topPane.openSettings();

  await settingsPane.openEmails();

  await emailsPage.fillNewEmailField(expectedEmail);
  await emailsPage.submitNewEmail();

  const userEmails: Array<GithubEmail> = await githubClient.getUserEmails();
  expect(userEmails.map(i => i.email), "Actual email list does not contain target email").toContain(expectedEmail);
});

test.afterAll(async () => {

  const userEmails: Array<GithubEmail> = await githubClient.getUserEmails();
  const targetEmailsToDelete = userEmails
    .filter(i => !i.primary && !i.verified)
    .map(e => e.email);
  githubClient.deleteUserEmails(targetEmailsToDelete);
});

