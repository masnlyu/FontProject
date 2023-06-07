import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Models/article';
import { ArticleService } from '../Service/article.service';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit {
  private _article: Article = {
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
  public get article(): Article {
    return this._article;
  }
  private set article(article: Article) {
    this._article = article;
  }
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
  ) { }
  public ngOnInit(): void {
    this.getArticle();
  }
  /**擷取URL上的資訊取得特定ID的文章
   */
  private getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe(
      (res) => {
        this.article = res;
      }
    );
  }
}
