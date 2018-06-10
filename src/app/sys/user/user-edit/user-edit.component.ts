import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../modal/modal.service';
import { HttpService } from '../../../core/http/http.service';
import { SystemConstant } from '../../../core/class/system-constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastConfig } from '../../../toast/toast-config';
import { ToastType } from '../../../toast/toast-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../toast/toast.service';
import { WaitService } from '../../../core/wait/wait.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() userData: any = null;
  userEditTitle: string;
  addFlag: boolean;
  action = '';
  userEditFormGroup: FormGroup;
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    this.userEditFormGroup = this.formBuilder.group({
      id: '',
      userName: '',
      loginCode: '',
      mobile: '',
      password: '',
      mgrType: '',
      email: ''
    });
  }

  ngOnInit() {
    if (this.userData === undefined || this.userData === null) {
      this.action = '新增';
      this.addFlag = true;
      this.userEditTitle = '新增用户';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.userEditTitle = '修改用户';
      this.userEditFormGroup.controls['id'].setValue(this.userData.id);
      this.userEditFormGroup.controls['userName'].setValue(this.userData.userName);
      this.userEditFormGroup.controls['loginCode'].setValue(this.userData.loginCode);
      this.userEditFormGroup.controls['mobile'].setValue(this.userData.mobile);
      this.userEditFormGroup.controls['email'].setValue(this.userData.email);
      this.userEditFormGroup.controls['password'].setValue(this.userData.password);
      this.userEditFormGroup.controls['mgrType'].setValue(this.userData.mgrType);
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
  userEditSubmit() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.USER_ADD;
    } else {
      url = SystemConstant.USER_EDIT;
    }
    this.httpService.post(url, this.userEditFormGroup.value).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '用户成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
        const status = data.status;
        // if (status === '1') {
        // } else {
        //   const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '用户失败！' + '失败原因：' + data.message, 3000);
        //   this.toastService.toast(toastCfg);
        //   this.activeModal.dismiss('failed');
        // }
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
