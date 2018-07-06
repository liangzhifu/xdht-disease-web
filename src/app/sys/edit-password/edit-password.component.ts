import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../core/http/http.service';
import { SystemConstant } from '../../core/class/system-constant';
import { ModalService } from '../../modal/modal.service';
import { AlertConfig } from '../../modal/alert/alert-config';
import { AlertType } from '../../modal/alert/alert-type';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ToastService} from '../../toast/toast.service';
import {SessionStorageService} from '../../core/storage/session-storage.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  @Input() user = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
  };
  constructor(
    private router: Router,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private toastService: ToastService,
    private sessionStorageService: SessionStorageService,
  ) {
  }

  ngOnInit() {
  }

  /**
   * 修改密码
   */
  editPassword() {
    if (this.user.newPassword === this.user.newPasswordAgain) {
      this.httpService.post(SystemConstant.EDIT_PASSWORD, this.user).subscribe({
        next: () => {
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '修改密码成功！', 3000);
          this.toastService.toast(toastCfg);
          this.activeModal.close('success');
          this.sessionStorageService.remove('token');
          this.router.navigate(['/login']).then();
        },
        error: (err) => {
          const alertConfig: AlertConfig = new AlertConfig(AlertType.ERROR, '修改密码', err.error.message);
          this.modalService.alert(alertConfig).then();
        },
        complete: () => {}
      });
    } else {
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '两次输入不一致！请重新输入。', 3000);
      this.toastService.toast(toastCfg);
      return false;
    }

  }

  /**
   * 关闭企业修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }
}
