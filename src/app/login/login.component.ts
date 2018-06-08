import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../core/storage/session-storage.service';
import { SystemConstant } from '../core/class/system-constant';
import { UserData } from '../core/class/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = '';
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sessionStorage: SessionStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      userNo : new FormControl('', Validators.compose([Validators.required])),
      loginPwd : new FormControl('', Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
  }

  login () {
    if (this.loginForm.valid) {
      this.httpClient.post(SystemConstant.GET_TOKEN, this.loginForm.value)
        .subscribe(
          {
            next: (data: any) => {
              if (data.code === 100) {
                const LoginResponse = data.content;
                if (LoginResponse.status === '0') {
                  this.sessionStorage.set('token', LoginResponse.token);
                  const user: UserData = new UserData();
                  user.userId = LoginResponse.userId;
                  user.userName = LoginResponse.showName;
                  user.userAvatar = './assets/img/user-header.png';
                  this.sessionStorage.setObject('user', user);
                  this.router.navigate(['/main']).then();
                } else {
                  this.loginError = '用户名或密码错误！';
                }
              } else {
                this.loginError = '用户名或密码错误！';
              }
            },
            error: (err) => {
              console.log(err);
              this.loginError = '用户名或密码错误！';
            },
            complete: () => {}
          });
    }
  }
}
