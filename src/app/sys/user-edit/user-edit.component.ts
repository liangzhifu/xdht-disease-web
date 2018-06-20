import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../modal/modal.service';
import { HttpService } from '../../core/http/http.service';
import { SystemConstant } from '../../core/class/system-constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastConfig } from '../../toast/toast-config';
import { ToastType } from '../../toast/toast-type.enum';
import { FormBuilder } from '@angular/forms';
import { ToastService } from '../../toast/toast.service';
import { WaitService } from '../../core/wait/wait.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() sysUser: any = {
    'id' : '',
    'userName' : '',
    'loginCode' : '',
    'password' : '',
    'mgrType' : '',
    'mobile' : '',
    'email' : '',
    'sex': ''
  };
  userEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
  }

  ngOnInit() {
    if (this.sysUser.id === undefined || this.sysUser.id  === null || this.sysUser.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.userEditTitle = '新增用户';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.userEditTitle = '修改用户';
    }
  }

  /**
   * 关闭角色修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交角色信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.USER_ADD;
    } else {
      url = SystemConstant.USER_EDIT;
    }
    this.httpService.post(url, this.sysUser).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '用户成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '用户失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
