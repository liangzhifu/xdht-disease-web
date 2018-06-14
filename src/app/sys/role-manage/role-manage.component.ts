import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SystemConstant } from '../../../core/class/system-constant';
import { WaitService } from '../../../core/wait/wait.service';
import { SimpleDataHttpPageComponent } from '../../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleEditComponent } from '../role-edit/role-edit.component';
import {HttpService} from '../../../core/http/http.service';
import {ToastConfig} from '../../../toast/toast-config';
import {ToastType} from '../../../toast/toast-type.enum';
import {ToastService} from '../../../toast/toast.service';
import {ConfirmConfig} from '../../../modal/confirm/confirm-config';
import {ModalService} from '../../../modal/modal.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {
  url: string;
  method: 'post';

  // paramFormGroup: FormGroup;
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    roleName: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }
  ngOnInit() {
    this.url = SystemConstant.ROLE_LIST;
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
   * 添加角色
   */
  addRole() {
    const modalRef = this.ngbModal.open(RoleEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      },
      // () => {}
    );
  }

  /**
   * 修改角色
   * @param roleId
   */
  editRole(roleId) {
    // 获取角色数据
    this.httpService.get(SystemConstant.ROLE_DETAIL + '/' + roleId).subscribe({
      next: (data) => {
        this.openEditRole(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取角色详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改角色对话框
   */
  openEditRole(roleData) {
    const modalRef = this.ngbModal.open(RoleEditComponent);
    modalRef.componentInstance.roleData = roleData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      },
      () => {}
    ).catch();
  }

  /**
   * 删除角色
   */
  delRole(roleId, roleName) {
    const confirmCfg = new ConfirmConfig('确定删除角色：' + roleName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.ROLE_DEL + '?id=' + roleId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除角色成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
            const status = data.status;
            // if (status === '1') {
            //   const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除角色成功！', 3000);
            //   this.toastService.toast(toastCfg);
            //   this.search();
            // } else {
            //   const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除角色失败！1111111' + '失败原因：' + data.message, 3000);
            //   this.toastService.toast(toastCfg);
            // }
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除角色失败!！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
