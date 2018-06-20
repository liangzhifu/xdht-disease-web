import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WaitService } from '../../core/wait/wait.service';
import { HttpService } from '../../core/http/http.service';
import { SystemConstant } from '../../core/class/system-constant';
import { ToastConfig } from '../../toast/toast-config';
import { ToastType } from '../../toast/toast-type.enum';
import { ToastService } from '../../toast/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../modal/modal.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  @Input() sysRole: any = {
    'id' : '',
    'roleName' : '',
    'isSys' : '',
    'status' : '',
    'remarks' : '',
  };
  addFlag: boolean;
  roleEditTitle: string;
  action = '';
  roleEditFormGroup: FormGroup;
  constructor(
    private modalService: ModalService,
    private formBuilder:  FormBuilder,
    private waitService: WaitService,
    private httpService: HttpService,
    private toastService: ToastService,
    private activeModal: NgbActiveModal
  ) {
    this.roleEditFormGroup = this.formBuilder.group({
      id: '',
      roleName: '',
      isSys: '',
      status: '',
      remarks: ''
    });
  }

  ngOnInit() {
    if (this.sysRole.id === undefined || this.sysRole.id === null || this.sysRole.id == '') {
      this.action = '新增';
      this.addFlag = true;
      this.roleEditTitle = '新增角色';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.roleEditTitle = '修改角色';
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
      url = SystemConstant.ROLE_ADD;
    } else {
      url = SystemConstant.ROLE_EDIT;
    }
    this.httpService.post(url, this.sysRole).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '角色成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '角色失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
