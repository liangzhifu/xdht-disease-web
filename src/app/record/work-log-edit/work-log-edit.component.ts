import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-work-log-edit',
  templateUrl: './work-log-edit.component.html',
  styleUrls: ['./work-log-edit.component.scss']
})
export class WorkLogEditComponent implements OnInit {
  recordWorkLogEditTitle: string;
  @Input() recordWorkLogInputRequest = {
    'recordWorkLog': {
      'id': '',
      'workLogNo': '',
      'verificationResult': ''
    },
    'recordWorkLogDataList': [{
      'id': '',
      'companyOfficeId': '',
      // 'officdName': '',
      'postId': '',
      'personOfClass': '',
      'workHours': '',
      'workPlace': '',
      'workContent': '',
      'hazardFactors': '',
      'remarks': '',
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
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordWorkLogInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordWorkLogInputRequest.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordWorkLogInputRequest.recordWorkLog.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordWorkLogEditTitle = '新增--工作日写实记录表';
      // 新增时 部门id 获取部门列表
      // this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      //   next: (data) => {
      //     this.recordWorkLogInputRequest.sysCompanyOfficeList = data;
      //   },
      //   complete: () => {
      //   }
      // });
      // // 新增时 岗位id 获取岗位列表
      // this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      //   next: (data) => {
      //     this.recordWorkLogInputRequest.sysPostList = data;
      //   },
      //   complete: () => {
      //   }
      // });
    } else {
      this.addFlag = false;
      this.recordWorkLogEditTitle = '修改--工作日写实记录表';
      // 修改时 获取内容列表
      const  dataList = this.recordWorkLogInputRequest.recordWorkLogDataList;
      this.recordWorkLogInputRequest.recordWorkLogDataList = [];
      // 项目列表

      for (let i = 0; i < dataList.length; i++) {
        const recordWorkLogData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'postId': dataList[i].postId,
          'personOfClass': dataList[i].personOfClass,
          'workHours': dataList[i].workHours,
          'workPlace': dataList[i].workPlace,
          'workContent': dataList[i].workContent,
          'hazardFactors': dataList[i].hazardFactors,
          'remarks': dataList[i].remarks,
          'relationId': dataList[i].relationId
          // 'officdName': officeList[i].officeName
        };
        this.recordWorkLogInputRequest.recordWorkLogDataList.push(recordWorkLogData);
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
    const index = this.recordWorkLogInputRequest.recordWorkLogDataList.length;
    this.recordWorkLogInputRequest.recordWorkLogDataList[index] = {
      id : '',
      companyOfficeId : '',
      postId : '',
      personOfClass : '',
      workHours : '',
      workPlace : '',
      workContent : '',
      hazardFactors : '',
      remarks : '',
      relationId : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordWorkLogInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordWorkLogInputRequest.recordWorkLogDataList.indexOf(item);
    this.recordWorkLogInputRequest.recordWorkLogDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.WORK_LOG_ADD;
    } else {
      url = SystemConstant.WORK_LOG_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordWorkLogInputRequest).subscribe({
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
