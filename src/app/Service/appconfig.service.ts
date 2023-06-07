import { Config } from './../Models/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {
  private _config: Config = {
    url: ''
  };
  public get config(): Config {
    return this._config;
  }
  private set config(option: Config) {
    this._config = option;
  }
  constructor(private http: HttpClient) {
  }
  public async loadConfig() {
    const api = this.http.get<Config>('assets/config/app-settings.json');
    this.config = await firstValueFrom(api);
  }
}
