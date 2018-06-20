import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';

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
    // 新增时 获取项目列表
    this.httpService.post(SystemConstant.HEALTH_MANAGEMENT_PROJECT_LIST, {} ).subscribe({
      next: (data) => {
        this.recordHealthManagementInputRequest.recordHealthManagementProjectList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const id = this.recordHealthManagementInputRequest.recordHealthManagement.id;
    if (id === undefined || id === null || id === '') {
      this.addFlag = true;
      this.recordHealthManagementEditTitle = '新增--建设项目概况调查表';
      const  dataList = this.recordHealthManagementInputRequest.recordHealthManagementDataList;
      this.recordHealthManagementInputRequest.recordHealthManagementDataList = [];
      const  projectList = this.recordHealthManagementInputRequest.recordHealthManagementProjectList ;
      for (let i = 0; i < dataList.length; i++) {
        const recordHealthManagementData = {
          'id': '',
          'healthManagementId': '',
          'healthManagementProjectId': projectList[i].id,
          'setUpInfo': '',
          'implementInfo': '',
          'remarks': '',
          'projectName': projectList[i].projectName
        };
        this.recordHealthManagementInputRequest.recordHealthManagementDataList.push(recordHealthManagementData);
      }
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

}
