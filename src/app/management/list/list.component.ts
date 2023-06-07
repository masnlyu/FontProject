import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { ArticlesPageFillter } from 'src/app/Models/articlesPageFillter';
import { ArticleService } from 'src/app/Service/article.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private _articles: Article[] = [];
  private _selectedArticle: Article = {
    id: 0,
    name: '',
    title: '',
    content: '',
    imgBase64: '',
    createTime: new Date,
    updateTime: new Date,
    updateAuthor_id: 0,
    archive: false
  };
  private _ArticlesPageFillter: ArticlesPageFillter = {
    nowPage: 0,
    pageSize: 0,
    collectionSize: 0
  };
  public get articles(): Article[] {
    return this._articles;
  }
  private set articles(articleArray: Article[]) {
    this._articles = articleArray;
  }
  public get selectedArticle(): Article {
    return this._selectedArticle;
  }
  private set selectedArticle(article: Article) {
    this._selectedArticle = article;
  }
  public get ArticlesPageFillter(): ArticlesPageFillter {
    return this._ArticlesPageFillter;
  }
  public set ArticlesPageFillter(fillter: ArticlesPageFillter) {
    this._ArticlesPageFillter = fillter;
  }
  constructor(private articleservice: ArticleService) {
    this.ArticlesPageFillter.pageSize = 10;
    this.ArticlesPageFillter.nowPage = 1;
  }
  public ngOnInit() {
    this.getArticlesForUser();
    this.getArtuclesCountForUser();
  }

  /**取得登入後的使用者文章內容
   */
  public getArticlesForUser(): void {
    this.articleservice.getArticlesForUser(this.ArticlesPageFillter).subscribe(
      (res: Article[]) => {
        this.articles = res;
      }
    );
  }
  /**取得登入後的使用者文章筆數
   */
  public getArtuclesCountForUser(): void {
    this.articleservice.getArticlesCountForUser().subscribe(
      (res: number) => {
        this.ArticlesPageFillter.collectionSize = res;
      }
    );
  }
  /**顯示確認刪除視窗 */
  public clickDeleteConfirm(article: Article): void {
    this.selectedArticle = article;
  }
  /**點擊確認後刪除
   * @param articleId
   */
  public onClickDelete(articleId: number) {
    this.articles = this.articles.filter(articles => articles.id !== articleId);
    this.articleservice.deleteArticle(articleId).subscribe(
      () => {
        alert('刪除成功');
        this.selectedArticle = {
          id: 0,
          name: '',
          title: '',
          content: '',
          imgBase64: '',
          createTime: new Date,
          updateTime: new Date,
          updateAuthor_id: 0,
          archive: false
        };
        this.getArtuclesCountForUser();
      }
    );
  }
}
