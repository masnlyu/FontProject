import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorInfo } from '../Models/authorInfo';
import { LoginInfo } from '../Models/loginInfo';
import { AuthService } from '../Service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _loginInfo: LoginInfo = {
    account: '',
    password: ''
  };
  private _invalidForm: FormGroup = new FormGroup({
  });
  public get loginInfo(): LoginInfo {
    return this._loginInfo;
  }
  public set loginInfo(loginInfo: LoginInfo) {
    this._loginInfo = loginInfo;
  }
  public get invalidForm(): FormGroup {
    return this._invalidForm;
  }
  private set invalidForm(form: FormGroup) {
    this._invalidForm = form;
  }
  constructor(private authService: AuthService, private router: Router, public formBuilder: FormBuilder) {
    this.invalidForm = this.formBuilder.group({
      account: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
      ]),
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
      ]),
      ],
    });
  }
  ngOnInit(): void {
  }
  /**登入
   */
  public login() {
    this.loginInfo.account = this.invalidForm.controls['account'].value;
    this.loginInfo.password = this.invalidForm.controls['password'].value;
    this.authService.login(this.loginInfo).subscribe(
      (res: AuthorInfo) => {
        localStorage.setItem('authorInfo', JSON.stringify(res));
        localStorage.setItem('loginState', 'true');
        this.authService.setAuthorInfo(res);
        this.authService.setIsLogin(true);
        this.router.navigateByUrl('/management');
      }
    );
  }
}
