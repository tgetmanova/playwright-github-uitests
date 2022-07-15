import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 15000,
  projects: [
    {
      name: 'Microsoft Edge',
      use: {
        // Supported Microsoft Edge channels are: msedge, msedge-beta, msedge-dev, msedge-canary
        channel: 'msedge',
      },
    }, 
    // {
    //   name: 'chromium',
    //   use: {
    //     browserName: 'chromium',
    //     viewport: { width: 1280, height: 720 }
    //   },
    // },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     viewport: { width: 1280, height: 720 }
    //   }
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     browserName: 'webkit',
    //     viewport: { width: 1280, height: 720 }
    //   }
    // }
  ],
};
export default config;