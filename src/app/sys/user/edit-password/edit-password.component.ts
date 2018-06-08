import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../core/http/http.service';
import { SystemConstant } from '../../../core/class/system-constant';
import { ModalService } from '../../../modal/modal.service';
import { AlertConfig } from '../../../modal/alert/alert-config';
import { AlertType } from '../../../modal/alert/alert-type';
import {SessionStorageService} from '../../../core/storage/session-storage.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  editPasswordError: '';
  editPasswordForm: FormGroup;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private sessionStorageService: SessionStorageService
  ) {
    this.editPasswordForm = this.formBuilder.group({
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    });
  }

  ngOnInit() {
  }

  /**
   * 修改密码
   */
  editPassword() {
    this.httpService.post(SystemConstant.EDIT_PASSWORD, this.editPasswordForm.value).subscribe({
      next: (data) => {
        if (data.status === '0') {
          const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '修改密码', '修改成功');
          if (this.modalService.alert(alertConfig).then()) {
            this.sessionStorageService.remove('token');
            this.router.navigate(['/login']).then();
          }
        } else {
          const alertConfig: AlertConfig = new AlertConfig(AlertType.ERROR, '修改密码', data.msg);
          this.modalService.alert(alertConfig).then();
        }
      },
      error: (err) => {
        console.log(err);
        },
      complete: () => {}
    });
  }
}
