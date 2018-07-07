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
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordHealthManagement: {
      id: '',
      sceneId: 0,
      healthManagementNo: '',
      verificationResult: ''
    },
    recordHealthManagementDataList: [{
      id: '',
      healthManagementId: '',
      healthManagementProjectId: '',
      setUpInfo: '',
      implementInfo: '',
      remarks: '',
      projectName: ''
    }],
    questionnaireId: 0
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

    if (this.recordData.recordHealthManagement === null
      || this.recordData.recordHealthManagement.id === null
      || this.recordData.recordHealthManagement.id === '') {
      this.addFlag = true;
      this.recordHealthManagementEditTitle = '新增--职业卫生管理情况调查表';
      this.recordData.recordHealthManagement = {
        id: '',
        sceneId: this.sceneId,
        healthManagementNo: '',
        verificationResult: ''
      };
      // 获取项目列表
      this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 4} ).subscribe({
        next: (data) => {
          this.recordData.recordHealthManagementDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordHealthManagementData = {
              'id': '',
              'healthManagementId': '',
              'healthManagementProjectId': data[i].id,
              'setUpInfo': '',
              'implementInfo': '',
              'remarks': '',
              'projectName': data[i].dictionaryName
            };
            this.recordData.recordHealthManagementDataList.push(recordHealthManagementData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordHealthManagementEditTitle = '修改--职业卫生管理情况调查表';
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
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.HEALTH_MANAGEMENT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordData).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
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
