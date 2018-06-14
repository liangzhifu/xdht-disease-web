import {Component, Input, OnInit} from '@angular/core';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';

@Component({
  selector: 'app-record-post-personel',
  templateUrl: './post-personel.component.html',
  styleUrls: ['./post-personel.component.scss']
})
export class PostPersonelComponent implements OnInit {
  recordPostPersonelEditTitle: string;
  @Input() recordPostPersonnelRequest = {
    'recordPostPersonnel' : {
      'id': '',
      'postPersonnelNo' : '',
      'verificationResult': ''
    },
    'recordPostPersonnelDataList' : [{
      'id' : ''
    }]
  };
  addFlag: boolean;
  action = '';
  constructor(
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    const postPersonnelId = this.recordPostPersonnelRequest.recordPostPersonnel.id;
    if (postPersonnelId === undefined || postPersonnelId === null || postPersonnelId === ''){
      this.addFlag = true;
      this.recordPostPersonelEditTitle = '新增--岗位定员及工作制度调查表';
    } else {
      this.addFlag = false;
      this.recordPostPersonelEditTitle = '修改--岗位定员及工作制度调查表';
    }
  }

  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 添加部门
   */
  addOffice() {
    const index = this.recordPostPersonnelRequest.recordPostPersonnelDataList.length;
    this.recordPostPersonnelRequest.recordPostPersonnelDataList[index] = { 'id' : ''};
  }

  /**
   * 删除部门
   * @param index 序号
   */
  delOffice(index) {
    this.recordPostPersonnelRequest.recordPostPersonnelDataList.slice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.httpService.post(SystemConstant.MENU_ADD, this.recordPostPersonnelRequest).subscribe({
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
  }
}
