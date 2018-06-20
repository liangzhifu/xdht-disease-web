import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../core/class/user-data';
import { MenuData } from './menu-data';
import { TitleService } from '../core/title/title.service';
import { ConfirmConfig } from '../modal/confirm/confirm-config';
import { ModalService } from '../modal/modal.service';
import { SessionStorageService } from '../core/storage/session-storage.service';
import { ToastType } from '../toast/toast-type.enum';
import { ToastConfig } from '../toast/toast-config';
import { SystemConstant } from '../core/class/system-constant';
import { HttpService } from '../core/http/http.service';
import { ToastService } from '../toast/toast.service';
import {EquipmentLayoutManageComponent} from '../record/equipment-layout-manage/equipment-layout-manage.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // 切换导航
  toggleDescTip = '点击关闭导航菜单';

  // 切换导航标识
  navClose = false;

  title = '首页';

  /**
   * 用户数据
   */
  userData: UserData;

  /**
   * 菜单数据
   * @type {any[]}
   */

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private titleService: TitleService,
    private toastService: ToastService,
    private modalService: ModalService,
    private sessionStorageService: SessionStorageService
  ) {
    this.titleService.titleEventEmitter.subscribe((value: string) => {
      if (value) {
        this.title = value;
      }
    });
  }

  ngOnInit() {
    this.userData = this.sessionStorageService.getObject('user');
    this.httpService.get(SystemConstant.MENU_LIST).subscribe({
      next: (data) => {
        this.menuData = data;
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取用户菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }
  /**
   * 切换导航
   */
  toggleNav() {
    this.navClose = !this.navClose;
    if (this.navClose) {
      this.toggleDescTip = '点击展开导航菜单';
    } else {
      this.toggleDescTip = '点击关闭导航菜单';
    }
  }

  /**
  * 跳转首页
  */
  toHome() {
    this.title = '首页';
    this.router.navigate(['/home']).then();
  }

  /**
   * 个人资料
   */
  userInfo() {
    this.router.navigate(['/main/sys/user/userInfo']).then();
  }

  /**
   * 修改密码
   */
  passwordEdit() {
    this.router.navigate(['/main/sys/user/editPassword']).then();
  }

  /**
   * 退出系统
   */
  exitSys() {
    const exitSysCfg = new ConfirmConfig('您确定退出系统吗？');
    this.modalService.confirm(exitSysCfg).then((result) => {
      if (result.status === 'approved') {
        this.sessionStorageService.remove('token');
        this.router.navigate(['/login']).then();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
