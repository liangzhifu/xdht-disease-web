import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import * as $ from 'jquery';
@Component({
  selector: 'app-present-situation-edit',
  templateUrl: './present-situation-edit.component.html',
  styleUrls: ['./present-situation-edit.component.scss']
})
export class PresentSituationEditComponent implements OnInit {
  recordPresentSituationEditTitle: string;
  @Input() recordPresentSituationRequest = {
    'recordPresentSituation': {
      'id': '',
      'preEvaluationNo': '',
      'verificationResult': ''
    },
    'recordPresentSituationDataList': [{
      'id': '',
      'preEvaluationId': '',
      'preEvaluationProjectId': '',
      'surveyResults': '',
      'remarks': '',
      'projectName': ''
    }],
    'recordPresentSituationProjectList': [{
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
  ) { }

  ngOnInit() {
    const preEvaluationId = this.recordPresentSituationRequest.recordPresentSituation.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.addFlag = true;
      this.recordPresentSituationEditTitle = '新增--用人单位概况调查表（现状评价）';
      // 新增时 获取项目列表
      this.httpService.post(SystemConstant.PRESENT_SITUATION_PROJECT_LIST, {} ).subscribe({
        next: (data) => {
          this.recordPresentSituationRequest.recordPresentSituationDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordPreEvaluationData = {
              'id': '',
              'preEvaluationId': '',
              'preEvaluationProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].projectName
            };
            this.recordPresentSituationRequest.recordPresentSituationDataList.push(recordPreEvaluationData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordPresentSituationEditTitle = '修改--用人单位概况调查表（现状评价）';
      // 修改时获取项目列表
      const  dataList = this.recordPresentSituationRequest.recordPresentSituationDataList;
      this.recordPresentSituationRequest.recordPresentSituationDataList = [];
      // 项目列表
      const  projectList = this.recordPresentSituationRequest.recordPresentSituationProjectList;
      for (let i = 0; i < dataList.length; i++) {
        // console.log('projectList:' + projectList[i].id);
        const recordPresentSituationData = {
          'id': dataList[i].id,
          'preEvaluationId': dataList[i].preEvaluationId,
          'preEvaluationProjectId': dataList[i].preEvaluationProjectId,
          'surveyResults': dataList[i].surveyResults,
          'remarks': dataList[i].remarks,
          'projectName': projectList[i].projectName
        };
        this.recordPresentSituationRequest.recordPresentSituationDataList.push(recordPresentSituationData);
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
      url = SystemConstant.PRESENT_SITUATION_ADD;
    } else {
      url = SystemConstant.PRESENT_SITUATION_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordPresentSituationRequest).subscribe({
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
