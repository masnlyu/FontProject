import { Article } from 'src/app/Models/article';
import { Component, OnInit } from '@angular/core';
import { ArticlesPageFillter } from '../Models/articlesPageFillter';
import { NewsArticle } from '../Models/newsArticle';
import { ArticleService } from '../Service/article.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private _ArticlesPageFillter: ArticlesPageFillter = {
    nowPage: 0, //當前頁碼
    pageSize: 0, //顯示數量
    collectionSize: 0 //總長度
  };
  private _articles: Article[] = [];
  private _sideNewArticles: NewsArticle[] = [];
  public get ArticlesPageFillter(): ArticlesPageFillter {
    return this._ArticlesPageFillter;
  }
  public set ArticlesPageFillter(fillter: ArticlesPageFillter) {
    this._ArticlesPageFillter = fillter;
  }
  public get articles(): Article[] {
    return this._articles;
  }
  private set articles(articleArray: Article[]) {
    this._articles = articleArray;
  }
  public get sideNewArticles(): NewsArticle[] {
    return this._sideNewArticles;
  }
  private set sideNewArticles(newsArticleArray: NewsArticle[]) {
    this._sideNewArticles = newsArticleArray;
  }
  constructor(
    private articleservice: ArticleService) {
    this.ArticlesPageFillter.nowPage = 1;
    this.ArticlesPageFillter.pageSize = 10;
  }

  public ngOnInit(): void {
    this.getArticles();
    this.getArticlesCount();
    this.getNewArticles();
  };

  /**下拉選單切換顯示項目數量
   * @param pageNum 數量
   */
  public selected(selectedNum: string) {
    this.ArticlesPageFillter.nowPage = 1;
    this.ArticlesPageFillter.pageSize = Number(selectedNum);
    this.articleservice.getArticles(this.ArticlesPageFillter).subscribe(
      (res: Article[]) => {
        this.articles = res;
      }
    );
  };
  /**取得分頁的文章
   */
  public getArticles(): void {
    this.articleservice.getArticles(this.ArticlesPageFillter).subscribe(
      (res: Article[]) => {
        this.articles = res;
      }
    );
  };
  /**取得所有文章筆數
   */
  public getArticlesCount() {
    this.articleservice.getArticlesCount().subscribe(
      (res: number) => {
        this.ArticlesPageFillter.collectionSize = res;
      }
    );
  }
  /**取得最新5筆文章列表
   */
  public getNewArticles() {
    this.articleservice.getNewArticles().subscribe(
      (res: NewsArticle[]) => {
        this.sideNewArticles = res;
      }
    );
  }
}
