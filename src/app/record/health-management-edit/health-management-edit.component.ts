import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-health-management-edit',
  templateUrl: './health-management-edit.component.html',
  styleUrls: ['./health-management-edit.component.scss']
})
export class HealthManagementEditComponent implements OnInit {

  recordHealthManagementEditTitle: string;
  @Input() recordHealthManagementInputRequest = {
    'recordHealthManagement': {
      'id': '',
      'healthManagementNo': '',
      'verificationResult': ''
    },
    'recordHealthManagementDataList': [{
      'id': '',
      'healthManagementId': '',
      'healthManagementProjectId': '',
      'setUpInfo': '',
      'implementInfo': '',
      'remarks': '',
      'projectName': ''
    }],
    'recordHealthManagementProjectList': [{
      'id': '',
      'projectName': '',
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
  }

  ngOnInit() {

    const healthManagementId = this.recordHealthManagementInputRequest.recordHealthManagement.id;
    if (healthManagementId === undefined || healthManagementId === null || healthManagementId === '') {
      this.addFlag = true;
      this.recordHealthManagementEditTitle = '新增--建设项目概况调查表';
      // 新增时 获取项目列表
      this.httpService.post(SystemConstant.HEALTH_MANAGEMENT_PROJECT_LIST, {} ).subscribe({
        next: (data) => {
          this.recordHealthManagementInputRequest.recordHealthManagementDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordHealthManagementData = {
              'id': '',
              'healthManagementId': '',
              'healthManagementProjectId': data[i].id,
              'setUpInfo': '',
              'implementInfo': '',
              'remarks': '',
              'projectName': data[i].projectName
            };
            this.recordHealthManagementInputRequest.recordHealthManagementDataList.push(recordHealthManagementData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordHealthManagementEditTitle = '修改--建设项目概况调查表';
      // 修改时获取项目列表
      const  dataList = this.recordHealthManagementInputRequest.recordHealthManagementDataList;
      this.recordHealthManagementInputRequest.recordHealthManagementDataList = [];
      // 项目列表
      const  projectList = this.recordHealthManagementInputRequest.recordHealthManagementProjectList;
      for (let i = 0; i < dataList.length; i++) {
        const recordHealthManagementData = {
          'id': dataList[i].id,
          'healthManagementId': dataList[i].healthManagementId,
          'healthManagementProjectId': dataList[i].healthManagementProjectId,
          'setUpInfo': dataList[i].setUpInfo,
          'implementInfo': dataList[i].implementInfo,
          'remarks': dataList[i].remarks,
          'projectName': projectList[i].projectName
        };
        this.recordHealthManagementInputRequest.recordHealthManagementDataList.push(recordHealthManagementData);
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
   * 提交数据
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.HEALTH_MANAGEMENT_ADD;
    } else {
      url = SystemConstant.HEALTH_MANAGEMENT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordHealthManagementInputRequest).subscribe({
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
