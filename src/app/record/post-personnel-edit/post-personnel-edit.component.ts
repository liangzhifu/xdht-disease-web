import {Component, Input, OnInit} from '@angular/core';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-post-personnel-edit',
  templateUrl: './post-personnel-edit.component.html',
  styleUrls: ['./post-personnel-edit.component.scss']
})
export class PostPersonnelEditComponent implements OnInit {
  recordPostPersonnelEditTitle: string;
  @Input() recordPostPersonnelInputRequest = {
    'recordPostPersonnel': {
      'id': '',
      'postPersonnelNo': '',
      'verificationResult': '',
      'sceneId' : ''
    },
    'recordPostPersonnelDataList': [{
      'id': '',
      'companyOfficeId': '',
      'postId': '',
      'perShift': '',
      'totalNumber': '',
      'dayOfWeek': '',
      'classOfDate': '',
      'hourOfClass': '',
      'relationId': ''
    }],
    'sysCompanyOfficeList': [{
      'id': '',
      'officeName': '',
      'status': ''
    }],
    'sysPostList': [{
      'id': '',
      'postName': '',
      'status': ''
    }]

  };
  addFlag: boolean;
  action = '';
  constructor(
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    this.httpService.post(SystemConstant.SYS_COMPANY_OFFICE_LIST, {} ).subscribe({
      next: (data) => {
        this.recordPostPersonnelInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordPostPersonnelInputRequest.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordPostPersonnelInputRequest.recordPostPersonnel.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordPostPersonnelEditTitle = '新增--岗位定员及工作制度调查表';
    } else {
      this.addFlag = false;
      this.recordPostPersonnelEditTitle = '修改--岗位定员及工作制度调查表';
      const  dataList = this.recordPostPersonnelInputRequest.recordPostPersonnelDataList;
      this.recordPostPersonnelInputRequest.recordPostPersonnelDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordPostPersonnelData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'postId': dataList[i].postId,
          'perShift': dataList[i].perShift,
          'totalNumber': dataList[i].totalNumber,
          'dayOfWeek': dataList[i].dayOfWeek,
          'classOfDate': dataList[i].classOfDate,
          'hourOfClass': dataList[i].hourOfClass,
          'relationId': dataList[i].relationId
        };
        this.recordPostPersonnelInputRequest.recordPostPersonnelDataList.push(recordPostPersonnelData);
      }
    }
  }
  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }
  /**
   * 添加一行
   */
  addOffice() {
    const index = this.recordPostPersonnelInputRequest.recordPostPersonnelDataList.length;
    this.recordPostPersonnelInputRequest.recordPostPersonnelDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'postId' : '', 'perShift' : '', 'totalNumber' : '', 'dayOfWeek' : '', 'classOfDate' : '', 'hourOfClass' : '',  'relationId' : ''};
    this.httpService.post(SystemConstant.SYS_COMPANY_OFFICE_LIST, {} ).subscribe({
      next: (data) => {
        this.recordPostPersonnelInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordPostPersonnelInputRequest.recordPostPersonnelDataList.indexOf(item);
    this.recordPostPersonnelInputRequest.recordPostPersonnelDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.POST_PERSONNEL_ADD;
    } else {
      url = SystemConstant.POST_PERSONNEL_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordPostPersonnelInputRequest).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }

}
