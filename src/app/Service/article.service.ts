import { AppconfigService } from './appconfig.service';
import { BackService } from './back.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article } from '../Models/article';
import { ArticlesPageFillter } from '../Models/articlesPageFillter';
import { NewsArticle } from '../Models/newsArticle';
import { CreateArticle } from '../Models/createArticle';
import { EditArticle } from '../Models/editArticle';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articleUrl: string = '';
  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public get articleUrl(): string {
    return this._articleUrl;
  }
  private set articleUrl(url: string) {
    this._articleUrl = url;
  }
  public get httpOptions() {
    return this._httpOptions;
  }
  constructor(private http: HttpClient, private backService: BackService, private appconfigService: AppconfigService) {
    this.articleUrl = `${this.appconfigService.config.url}/api/articles`;
  }
  /**取得目前分頁的文章列表
   * @param filter 目前分頁&要取幾篇
   * @returns 文章列表
   */
  public getArticles(filter: ArticlesPageFillter): Observable<Article[]> {
    const url: string = this.articleUrl;
    let params: HttpParams = new HttpParams();
    params = params.append('NowPage', filter.nowPage);
    params = params.append('PageSize', filter.pageSize);
    return this.backService.getApi<Article[]>(url, params);
  }
  /**取得最新文章列表
   * @returns 最新文章列表
  */
  public getNewArticles(): Observable<NewsArticle[]> {
    const url: string = `${this.articleUrl}/news`;
    return this.backService.getApi<NewsArticle[]>(url);
  }
  /**取得文章筆數
   * @returns 文章筆數
   */
  public getArticlesCount(): Observable<number> {
    const url: string = `${this.articleUrl}/count`;
    return this.backService.getApi<number>(url);
  }
  /** 取得使用者的文章
   * @param filter 目前分頁&要取幾篇
   * @returns 使用者的文章
   */
  public getArticlesForUser(filter: ArticlesPageFillter): Observable<Article[]> {
    const url: string = `${this.articleUrl}/management`;
    let params = new HttpParams();
    params = params.append('NowPage', filter.nowPage);
    params = params.append('PageSize', filter.pageSize);
    return this.backService.getApi(url, params);

  }
  /**取得使用者的文章筆數
   * @returns 文章筆數
   */
  public getArticlesCountForUser(): Observable<number> {
    const url: string = `${this.articleUrl}/management/count`;
    return this.backService.getApi(url);
  }
  /**取得指定的文章內容
   * @param id 文章編號
   * @returns 指定文章內容
   */
  public getArticle(id: number): Observable<Article> {
    const url: string = `${this.articleUrl}/${id}`;
    return this.backService.getApi(url);
  }
  /**新增文章
   * @param createArticle 新增的文章內容
   * @returns 回應訊息
   */
  public postArticle(createArticle: CreateArticle): Observable<CreateArticle> {
    const url: string = this.articleUrl;
    return this.backService.postApi(url, createArticle);
  }
  /**取得編輯的文章內容
   * @param id 文章編號
   * @returns 文章內容
   */
  public getEditArticle(id: number): Observable<EditArticle> {
    const url = `${this.articleUrl}/edit/${id}`;
    return this.backService.getApi(url);
  }
  /**修改文章
   * @param editArticle 要修改的文章內容
   * @returns 回應訊息
   */
  public updateArticle(editArticle: EditArticle): Observable<string> {
    const url = `${this.articleUrl}/${editArticle.id}`;
    return this.backService.putApi(url, editArticle);
  }
  /** 刪除文章
   * @param articleId 文章編號
   * @returns 回應訊息
   */
  public deleteArticle(articleId: number): Observable<string> {
    const url = `${this.articleUrl}/${articleId}`;
    return this.backService.deleteApi(url);
  }
}
