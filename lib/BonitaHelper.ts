import { z } from 'zod';

export class BonitaHelper {
  username: string;
  password: string;
  cookie: string = '';
  baseUrl: string = process.env.BONITA_URL || 'http://localhost:8080/bonita';
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    async () => {
      await this.login();
    };
  }

  async login() {
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', this.username);
    urlencoded.append('password', this.password);
    urlencoded.append('redirect', 'false');

    try {
      return await fetch(`${this.baseUrl}/loginservice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlencoded,
        credentials: 'include', // Manage automatically cookies and other credentials in the response
      });
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  async getProcess() {
    try {
      let processes = fetch(`${this.baseUrl}/API/bpm/process?p=0&c=10`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      return processes;
    } catch (error) {
      console.error('Error fetching processes:', error);
      throw error; // Optionally rethrow the error for further handling
    }
  }

  async getSession() {
    const response = await fetch(
      `${this.baseUrl}/API/system/session/unusedId`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    console.log('result', response);
    return response;
  }
}
