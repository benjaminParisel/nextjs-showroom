import { z } from 'zod';

export class BonitaHelper {
  username: string;
  password: string;
  cookie: string = '';
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  async login() {
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', this.username);
    urlencoded.append('password', this.password);
    urlencoded.append('redirect', 'false');

    try {
      return await fetch(`/bonita/loginservice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlencoded,
      });
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  async getProcess() {
    try {
      let processes = fetch(`/bonita/API/bpm/process?p=0&c=10`, {
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
    const response = await fetch(`/bonita/API/system/session/unusedId`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    console.log('result', response);
    return response;
  }
}
