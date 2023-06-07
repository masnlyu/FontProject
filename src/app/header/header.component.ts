import { AuthorInfo } from './../Models/authorInfo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _authorinfo: AuthorInfo = {
    id: 0,
    name: ''
  };
  private _title: string = '';
  public get authorinfo(): AuthorInfo {
    return this._authorinfo;
  }
  private set authorinfo(authorinfo: AuthorInfo) {
    this._authorinfo = authorinfo;
  }
  public get title(): string {
    return this._title;
  };
  private set title(title: string) {
    this._title = title;
  };

  constructor(private authService: AuthService, private router: Router) {
    this.title = '我的Angular';
  }
  ngOnInit() {

  };
  /** 點擊登出
   */
  public onClickLogout(): void {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigateByUrl('/home');
    });
  };
  public getAuthorInfo(): AuthorInfo {
    let author = (localStorage.getItem('authorInfo')) ?? '';
    this.authorinfo = JSON.parse(author);
    return this.authorinfo;
  };
  public checkLogin(): boolean {
    if ((localStorage.getItem('loginState') === null) || (localStorage.getItem('loginState') === 'flase')) {
      return false;
    } else {
      return true;
    };
  }
}
