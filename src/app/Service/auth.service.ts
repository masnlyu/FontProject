import { AppconfigService } from './appconfig.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackService } from './back.service';
import { AuthorInfo } from '../Models/authorInfo';
import { LoginInfo } from '../Models/loginInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUrl: string = '';
  private _isLogin: boolean = false;
  private _authorinfo: AuthorInfo = {
    id: 0,
    name: ''
  };
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public get authUrl() {
    return this._authUrl;
  }
  private set authUrl(url: string) {
    this._authUrl = url;
  }
  public get httpOptions() {
    return this._httpOptions;
  }
  private set httpOptions(Option) {
    this._httpOptions = Option;
  }
  public get is_login(): boolean {
    return this._isLogin;
  }
  private set is_login(status: boolean) {
    this._isLogin = status;
  }
  public get authorInfo(): AuthorInfo {
    return this._authorinfo;
  }
  private set authorInfo(authorInfo: AuthorInfo) {
    this._authorinfo = authorInfo;
  }
  constructor(private http: HttpClient, private backService: BackService, private appconfigService: AppconfigService) {
    this.authUrl = `${this.appconfigService.config.url}/api/auth`;
  }
  /**登入
   * @param loginInfo 登入資訊
   * @returns 回應訊息
   */
  public login(loginInfo: LoginInfo): Observable<AuthorInfo> {
    const url = `${this.authUrl}/login`;
    return this.backService.postApi(url, loginInfo);
  }
  /**登出
   * @returns 回應訊息
   */
  public logout(): Observable<string> {
    const url = `${this.authUrl}/logout`;
    return this.backService.getApi(url);
  }
  public setIsLogin(bool: boolean): void {
    this.is_login = bool;
  }
  public setAuthorInfo(authorInfo: AuthorInfo) {
    this.authorInfo = authorInfo;
  }
}
