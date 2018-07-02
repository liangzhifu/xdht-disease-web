import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../core/storage/session-storage.service';
import { SystemConstant } from '../core/class/system-constant';
import { UserData } from '../core/class/user-data';
import {ToastConfig} from '../toast/toast-config';
import {ToastType} from '../toast/toast-type.enum';
import {HttpService} from '../core/http/http.service';
import {ToastService} from '../toast/toast.service';

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
    private sessionStorage: SessionStorageService,
    private httpService: HttpService,
    private toastService: ToastService
  ) {
    this.loginForm = this.formBuilder.group({
      loginCode : ['', Validators.required ],
      password : ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  /**
   * 登录
   */
  login () {
      this.httpClient.post(SystemConstant.GET_TOKEN, this.loginForm.value)
        .subscribe(
          {
            next: (data: any) => {
              if (data.code === 100) {
                const LoginResponse = data.content;
                if (LoginResponse.status === '1') {
                  this.sessionStorage.set('token', LoginResponse.token);
                  const user: UserData = new UserData();
                  user.userName = LoginResponse.userName;
                  const imageName = LoginResponse.imageName;
                  if (imageName === undefined || imageName === null || imageName === '') {
                    user.userAvatar = './assets/img/user-header.png';
                  } else {
                    user.userAvatar = SystemConstant.IMAG_PATH + imageName;
                  }
                  this.sessionStorage.setObject('user', user);
                  this.getSysInfo();
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

  /**
   * 获取系统信息
   */
  getSysInfo() {
    // 获取字典表类型
    this.httpService.post(SystemConstant.DICTIONARY_TYPE_LIST, {}).subscribe({
      next: (data) => {
        this.sessionStorage.setObject('dictionary_type', data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取字典类型数据失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
    // 获取菜单
    this.httpService.get(SystemConstant.MENU_LIST).subscribe({
      next: (data) => {
        this.sessionStorage.setObject('menu', data);
        this.router.navigate(['/main']).then();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取用户菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }
}
