import { Article } from 'src/app/Models/article';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ArticleService } from 'src/app/Service/article.service';
import { CreateArticle } from 'src/app/Models/createArticle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private _resetImgStatus: boolean = false;
  private _imgUrl: string = '';
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
  private _invalidForm: FormGroup = new FormGroup({
  });
  public get article(): Article {
    return this._article;
  }
  public set article(article: Article) {
    this._article = article;
  }
  public get imgUrl(): string {
    return this._imgUrl;
  }
  public set imgUrl(url: string) {
    this._imgUrl = url;
  }
  public get resetImgStatus(): boolean {
    return this._resetImgStatus;
  }
  public set resetImgStatus(x: boolean) {
    this._resetImgStatus = x;
  }
  public get invalidForm(): FormGroup {
    return this._invalidForm;
  }
  private set invalidForm(form: FormGroup) {
    this._invalidForm = form;
  }
  constructor(private articleService: ArticleService, private location: Location, public formBuilder: FormBuilder) {
    this.invalidForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ]),
      ],
      content: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
      ]),
      ],
      imgBase64: ['', [Validators.required,]],
    });
  };
  ngOnInit(): void {
  }
  /**新增文章
   */
  public onClickPost() {
    let createArticle: CreateArticle = {
      title: this.invalidForm.controls['title'].value,
      content: this.invalidForm.controls['content'].value,
      imgBase64: this.invalidForm.controls['imgBase64'].value,
      createTime: new Date,
      updateTime: new Date,
      createAuthor_Id: 0,
      updateAuthor_id: 0,
      archive: false
    };
    this.articleService.postArticle(createArticle).subscribe(
      () => {
        alert('新增文章成功');
        this.location.back();
      }
    );
  }
  /**選擇圖片
   * @param event
   */
  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.invalidForm.controls['imgBase64'].setValue(reader.result);
        this.article.imgBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.resetImgStatus = false;
    }
  }
  /**圖片重設
   */
  public resetImg(): void {
    this.invalidForm.controls['imgBase64'].setValue('');
    this.article.imgBase64 = '';
    this.resetImgStatus = true;
    const fileimg = document.getElementById('fileimg') as HTMLInputElement;
    fileimg.value = '';
  }
}
