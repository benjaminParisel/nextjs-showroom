import { z } from 'zod';
import { Session } from './BonitaSchema';

export class BonitaHelper {
  username: string = '';
  password: string = '';
  cookie: string = '';
  baseUrl: string = '';
  hasSessionActive: boolean = false;
  bonitaToken: string = '';
  bonitaSession: Session = {} as Session;
  constructor(
    username = process.env.BONITA_USERNAME,
    password = process.env.BONITA_PASSWORD,
    baseUrl = process.env.BONITA_URL
  ) {
    this.username = username as string;
    this.password = password! as string;
    this.baseUrl = baseUrl as string;
  }

  async login() {
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', this.username);
    urlencoded.append('password', this.password);
    urlencoded.append('redirect', 'false');

    try {
      let loginResponse = await fetch(`${this.baseUrl}/loginservice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlencoded,
        credentials: 'include', // Manage automatically cookies and other credentials in the response
      });

      if (loginResponse.ok) {
        this.hasSessionActive = true;
        const getAuthToken = await this.getSession();
      }
    } catch (error) {
      console.log(error);
      //throw Error();
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
    if (!response.ok) {
      this.hasSessionActive = false;
      throw Error(response.statusText);
    }
    this.hasSessionActive = true;
    this.bonitaToken = response.headers.get('x-bonita-api-token') as string;
    this.bonitaSession = await response.json();
    return this.bonitaSession;
  }
}
