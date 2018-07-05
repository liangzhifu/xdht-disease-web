import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../core/class/user-data';
import { TitleService } from '../title.service';
import { ConfirmConfig } from '../modal/confirm/confirm-config';
import { ModalService } from '../modal/modal.service';
import { SessionStorageService } from '../core/storage/session-storage.service';
import { HttpService } from '../core/http/http.service';
import { ToastService } from '../toast/toast.service';
import {CompanyEditComponent} from '../sys/company-edit/company-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditPasswordComponent} from '../sys/edit-password/edit-password.component';

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
  menuData = null;

  constructor(
    private ngbModal: NgbModal,
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
    this.menuData = this.sessionStorageService.getObject('menu');
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
   * 打开修改密码对话框
   */
  openPasswordEdit() {
    this.ngbModal.open(EditPasswordComponent, {backdrop: 'static', keyboard: false});
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
