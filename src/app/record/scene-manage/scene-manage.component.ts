import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../core/http/http.service';
import { ToastConfig } from '../../toast/toast-config';
import { SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import { ConfirmConfig } from '../../modal/confirm/confirm-config';
import { ToastType } from '../../toast/toast-type.enum';
import { UserEditComponent } from '../../sys/user-edit/user-edit.component';
import { ModalService } from '../../modal/modal.service';
import { SystemConstant} from '../../core/class/system-constant';
import { WaitService } from '../../core/wait/wait.service';
import { ToastService } from '../../toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-record-scene-manage',
  templateUrl: './scene-manage.component.html',
  styleUrls: ['./scene-manage.component.scss']
})
export class SceneManageComponent implements OnInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    projectName: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.url = SystemConstant.USER_LIST;
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
   * 新增--职业卫生现场调查记录
   */
  addScene() {
    const modalRef = this.ngbModal.open(UserEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改--职业卫生现场调查记录
   */
  editScene(userId) {
    // 获取用户数据
    this.httpService.get(SystemConstant.USER_DETAIL + '/' + userId).subscribe({
      next: (data) => {
        this.openEditScene(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取用户详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改(职业卫生现场调查记录)对话框
   */
  openEditScene(userData) {
    const modalRef = this.ngbModal.open(UserEditComponent);
    modalRef.componentInstance.userData = userData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除--职业卫生现场调查记录
   */
  delScene(userId, userName) {
    const confirmCfg = new ConfirmConfig('确定删除用户：' + userName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.USER_DEL + '?id=' + userId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除用户成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
            const status = data.status;
            // if (status === '0') {
            //   const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除用户成功！', 3000);
            //   this.toastService.toast(toastCfg);
            //   this.search();
            // } else {
            //   const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除用户失败！' + '失败原因：' + data.message, 3000);
            //   this.toastService.toast(toastCfg);
            // }
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
}
