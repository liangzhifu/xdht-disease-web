import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-present-situation-edit',
  templateUrl: './present-situation-edit.component.html',
  styleUrls: ['./present-situation-edit.component.scss']
})
export class PresentSituationEditComponent implements OnInit {
  recordPresentSituationEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordPresentSituation: {
      id: '',
      sceneId: 0,
      preEvaluationNo: '',
      verificationResult: ''
    },
    recordPresentSituationDataList: [{
      id: '',
      preEvaluationId: '',
      preEvaluationProjectId: '',
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
  ) { }

  ngOnInit() {
    if (this.recordData.recordPresentSituation === null
      || this.recordData.recordPresentSituation.id === null
      || this.recordData.recordPresentSituation.id === '') {
      this.addFlag = true;
      this.recordPresentSituationEditTitle = '新增--用人单位概况调查表（现状评价）';
      this.recordData.recordPresentSituation = {
        id: '',
        sceneId: this.sceneId,
        preEvaluationNo: '',
        verificationResult: ''
      };
      // 获取项目列表
      this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 3} ).subscribe({
        next: (data) => {
          this.recordData.recordPresentSituationDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordPresentSituationData = {
              'id': '',
              'preEvaluationId': '',
              'preEvaluationProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].dictionaryName
            };
            this.recordData.recordPresentSituationDataList.push(recordPresentSituationData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordPresentSituationEditTitle = '修改--用人单位概况调查表（现状评价）';
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
    this.recordData.questionnaireId = this.questionnaireId;
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.PRESENT_SITUATION_ADD;
    } else {
      url = SystemConstant.PRESENT_SITUATION_EDIT;
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
