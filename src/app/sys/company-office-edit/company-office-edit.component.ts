import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';

@Component({
  selector: 'app-company-office-edit',
  templateUrl: './company-office-edit.component.html',
  styleUrls: ['./company-office-edit.component.scss']
})
export class CompanyOfficeEditComponent implements OnInit {

  @Input() companyId = null;
  @Input() parentId = null;
  @Input() SysCompanyOffice = {
    id : '',
    parentId : 0,
    companyId : '',
    officeName : ''
  };
  action = null;
  addFlag = null;
  companyOfficeEditTitle = '';
  constructor(
    private activeModal: NgbActiveModal,
    private waitService: WaitService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    if (this.SysCompanyOffice.id === undefined || this.SysCompanyOffice.id === null || this.SysCompanyOffice.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.companyOfficeEditTitle = '新增部门';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.companyOfficeEditTitle = '修改部门';
    }
  }

  /**
   * 关闭修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.OFFICE_ADD;
      this.SysCompanyOffice.companyId = this.companyId;
      this.SysCompanyOffice.parentId = this.parentId;
    } else {
      url = SystemConstant.OFFICE_EDIT;
    }
    this.httpService.post(url, this.SysCompanyOffice).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
