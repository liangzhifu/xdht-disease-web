import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleDataHttpPageComponent } from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import { SystemConstant } from '../../core/class/system-constant';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { WaitService } from '../../core/wait/wait.service';
import { ToastConfig } from '../../toast/toast-config';
import { ToastType } from '../../toast/toast-type.enum';
import { ConfirmConfig } from '../../modal/confirm/confirm-config';
import { ModalService } from '../../modal/modal.service';
import { HttpService } from '../../core/http/http.service';
import { ToastService } from '../../toast/toast.service';
import {RoleChooseComponent} from '../role-choose/role-choose.component';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit, AfterViewInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    userName: '',
    loginCode: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('用户管理');
  }

  ngOnInit() {
    this.url = SystemConstant.USER_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
  }

  /**
   * 查询
   */
  search() {
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 新增用户
   */
  addUser() {
    const modalRef = this.ngbModal.open(UserEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改用户
   */
  editUser(userId) {
    // 获取用户数据
    this.httpService.get(SystemConstant.USER_DETAIL + '/' + userId).subscribe({
      next: (data) => {
        this.openEditUser(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取用户详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改用户对话框
   */
  openEditUser(userData) {
    const modalRef = this.ngbModal.open(UserEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.sysUser = userData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除用户
   */
  delUser(userId, userName) {
    const confirmCfg: ConfirmConfig = new ConfirmConfig('确定删除用户：' + userName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.USER_DEL + '?id=' + userId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除用户成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除用户失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

  /**
   * 分配用户角色
   * @param userId
   */
  editUserRole(userId) {
    const modalRef = this.ngbModal.open(RoleChooseComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.userId = userId;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      },
      () => {}
    ).catch();
  }
}
