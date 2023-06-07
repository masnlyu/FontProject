import { Config } from './../Models/config';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, filter, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResponseBox } from '../Models/responseBox';
import { StateReference } from '../Models/stateReference';
import { EditArticle } from '../Models/editArticle';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BackService {
  private _config: Config = {
    url: ''
  };
  private _httpHeaders: HttpHeaders = new HttpHeaders();
  public get config(): Config {
    return this._config;
  }
  private set config(config: Config) {
    this._config = config;
  }
  public get HttpHeaders(): HttpHeaders {
    return this._httpHeaders;
  }
  private set HttpHeaders(valus) {
    this._httpHeaders = valus;
  }
  constructor(private location: Location, private router: Router, private http: HttpClient) {
    this.HttpHeaders = this.HttpHeaders.set('Content-Type', 'application/json');
    this.http.get<Config>('assets/config/app-settings.json').subscribe(res => {
      this.config = res;
    });
  }
  /**API請求過濾
   * @param api API的請求
   * @returns 過濾後的物件
   */

  private myFilterFunc<T>(res: ResponseBox<T>): boolean {
    let filterResult: boolean = false;
    if (res.status === StateReference.Success) {
      filterResult = true;
    } else if (res.status === StateReference.GetArticleDetailFail) {
      alert(res.text);
      this.location.back();
      filterResult = false;
    } else if (res.status === StateReference.AuthenticationFailed) {
      localStorage.clear();
      alert(`${res.text}請重新登入`);
      this.router.navigateByUrl('/login');
      filterResult = false;
    }
    else {
      alert(res.text);
      filterResult = false;
    }
    return filterResult;
  }

  public getApi<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<ResponseBox<T>>(url, { headers: this.HttpHeaders, params: params }).pipe(
      filter(res => { return this.myFilterFunc<T>(res); }),
      map(res => {
        return res.result;
      }),
      catchError(err => {
        throw Error(err);
      }));
  }
  public postApi<T1, T2>(url: string, bodyParameter: T2): Observable<T1> {
    return this.http.post<ResponseBox<T1>>(url, bodyParameter, { headers: this.HttpHeaders }).pipe(
      filter(this.myFilterFunc<T1>),
      map(res => {
        return res.result;
      }),
      catchError(err => {
        throw Error(err);
      }));
  }
  public putApi<T>(url: string, bodyParameter: EditArticle): Observable<T> {
    return this.http.put<ResponseBox<T>>(url, bodyParameter, { headers: this.HttpHeaders }).pipe(
      filter(this.myFilterFunc<T>),
      map(res => {
        return res.result;
      }),
      catchError(err => {
        throw Error(err);
      }));
  }
  public deleteApi<T>(url: string): Observable<T> {
    return this.http.delete<ResponseBox<T>>(url).pipe(
      filter(this.myFilterFunc<T>),
      map(res => {
        return res.result;
      }),
      catchError(err => {
        throw Error(err);
      }));
  }
}

