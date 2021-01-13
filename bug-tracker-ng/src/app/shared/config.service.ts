import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //private APIConnectionBaseUrl = 'https://bugtrace.azurewebsites.net';
  private APIConnectionBaseUrl = 'http://localhost:3002';

  getAPIConnectionBaseUrl(): string {
    return this.APIConnectionBaseUrl;
  }
}
