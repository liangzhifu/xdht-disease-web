import {Component, Input, OnInit} from '@angular/core';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-health-care-edit',
  templateUrl: './health-care-edit.component.html',
  styleUrls: ['./health-care-edit.component.scss']
})
export class HealthCareEditComponent implements OnInit {
  recordHealthCareEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordHealthCare: {
      id: '',
      sceneId: 0,
      healthCareNo: '',
      verificationResult: ''
    },
    recordHealthCareDataList: [{
      id: '',
      healthCareId: '',
      healthCareProjectId: '',
      surveyResults: '',
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
    if (this.recordData.recordHealthCare === null
      || this.recordData.recordHealthCare.id === null
      || this.recordData.recordHealthCare.id === '') {
      this.addFlag = true;
      this.recordHealthCareEditTitle = '新增--职业健康监护情况调查表';
      this.recordData.recordHealthCare = {
        id: '',
        sceneId: 0,
        healthCareNo: '',
        verificationResult: ''
      };
      // 获取项目列表
      this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 1} ).subscribe({
        next: (data) => {
          this.recordData.recordHealthCareDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordPreEvaluationData = {
              'id': '',
              'healthCareId': '',
              'healthCareProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].dictionaryName
            };
            this.recordData.recordHealthCareDataList.push(recordPreEvaluationData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordHealthCareEditTitle = '修改--职业健康监护情况调查表';
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
      url = SystemConstant.HEALTH_CARE_ADD;
      this.recordData.recordHealthCare.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.HEALTH_CARE_EDIT;
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
