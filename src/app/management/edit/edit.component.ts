import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditArticle } from 'src/app/Models/editArticle';
import { ArticleService } from 'src/app/Service/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private _resetImgStatus: boolean = false;
  private _article: EditArticle = {
    id: 0,
    title: '',
    content: '',
    imgBase64: '',
    updateTime: new Date,
    updateAuthor_id: 0,
  };
  private _invalidForm: FormGroup = new FormGroup({
  });
  public get article(): EditArticle {
    return this._article;
  }
  private set article(editArticle: EditArticle) {
    this._article = editArticle;
  }
  public get resetImgStatus(): boolean {
    return this._resetImgStatus;
  }
  public set resetImgStatus(imgStatus: boolean) {
    this._resetImgStatus = imgStatus;
  }
  public get invalidForm(): FormGroup {
    return this._invalidForm;
  }
  private set invalidForm(form: FormGroup) {
    this._invalidForm = form;
  }
  constructor(public articleService: ArticleService, private route: ActivatedRoute, private location: Location, private router: Router, public formBuilder: FormBuilder) {
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
  }
  public ngOnInit(): void {
    this.getEditArticle();
  }
  /**取得編輯的文章內容
   */
  public getEditArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getEditArticle(id).subscribe(
      (res: EditArticle) => {
        this.article = res;
        this.invalidForm.controls['title'].setValue(res.title);
        this.invalidForm.controls['imgBase64'].setValue(res.imgBase64);
        this.invalidForm.controls['content'].setValue(res.content);
      }
    );
  }
  /**更新文章
   */
  public onClickUpdate() {
    this.article.title = this.invalidForm.controls['title'].value;
    this.article.content = this.invalidForm.controls['content'].value;
    this.article.imgBase64 = this.invalidForm.controls['imgBase64'].value;
    this.articleService.updateArticle(this.article).subscribe(
      () => {
        alert('更新成功');
        this.location.back();
      }
    );
  }
  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.invalidForm.controls['imgBase64'].setValue(reader.result);
      this.article.imgBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  public resetImg(): void {
    this.invalidForm.controls['imgBase64'].setValue('');
    this.article.imgBase64 = '';
    this.resetImgStatus = true;
    const fileimg = document.getElementById('fileimg') as HTMLInputElement;
    fileimg.value = '';
  }
}
