import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { GithubEmail } from '../data/github-email';

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  headers: {
    'Authorization': 'token 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',
    'Accept': 'application/vnd.github+json'
  }
});

let config: AxiosRequestConfig = {};

export class GithubClient {

  public deleteUserEmails(emailsToDelete: Array<String>): void {
    config.data = emailsToDelete;

    instance.delete('user/emails', config)
      .then(deleteResponse => console.log(deleteResponse.request.data))
      .catch(error => {
        if (!axios.isAxiosError(error)) {
          console.log(error);
          return;
        }

        const ae = error as AxiosError<any>;
        console.log(`REQUEST data: ${JSON.stringify(ae.request.data)}`);
        console.log(`RESPONSE error: ${error}; data: ${JSON.stringify(ae.response?.data!)}`);
      });
  }

  public async getUserEmails(): Promise<Array<GithubEmail>> {
    const response = await instance.get('user/emails');
    console.log(JSON.stringify(response.data));
    return response.data;
  }

}

