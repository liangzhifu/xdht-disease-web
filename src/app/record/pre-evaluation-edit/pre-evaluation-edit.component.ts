import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
// import * as $ from 'jquery';
@Component({
  selector: 'app-pre-evaluation-edit',
  templateUrl: './pre-evaluation-edit.component.html',
  styleUrls: ['./pre-evaluation-edit.component.scss']
})
export class PreEvaluationEditComponent implements OnInit {
  recordPreEvaluationEditTitle: string;
  @Input() recordPreEvaluationRequest = {
    'recordPreEvaluation': {
      'id': '',
      'preEvaluationNo': '',
      'verificationResult': ''
    },
    'recordPreEvaluationDataList': [{
      'id': '',
      'preEvaluationId': '',
      'preEvaluationProjectId': '',
      'surveyResults': '',
      'remarks': '',
      'projectName': ''
    }],
    'recordPreEvaluationProjectList': [{
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
    const preEvaluationId = this.recordPreEvaluationRequest.recordPreEvaluation.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.addFlag = true;
      this.recordPreEvaluationEditTitle = '新增--建设项目概况调查表';
      // 新增时 获取项目列表
      this.httpService.post(SystemConstant.PRE_EVALUATION_PROJECT_LIST, {} ).subscribe({
        next: (data) => {
          this.recordPreEvaluationRequest.recordPreEvaluationDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordPreEvaluationData = {
              'id': '',
              'preEvaluationId': '',
              'preEvaluationProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].projectName
            };
            this.recordPreEvaluationRequest.recordPreEvaluationDataList.push(recordPreEvaluationData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordPreEvaluationEditTitle = '修改--建设项目概况调查表';
      // 修改时获取项目列表
          const  dataList = this.recordPreEvaluationRequest.recordPreEvaluationDataList;
          this.recordPreEvaluationRequest.recordPreEvaluationDataList = [];
          // 项目列表
          const  projectList = this.recordPreEvaluationRequest.recordPreEvaluationProjectList;
          for (let i = 0; i < dataList.length; i++) {
            // console.log('projectList:' + projectList[i].id);
            const recordPreEvaluationData = {
              'id': dataList[i].id,
              'preEvaluationId': dataList[i].preEvaluationId,
              'preEvaluationProjectId': dataList[i].preEvaluationProjectId,
              'surveyResults': dataList[i].surveyResults,
              'remarks': dataList[i].remarks,
              'projectName': projectList[i].projectName
            };
            this.recordPreEvaluationRequest.recordPreEvaluationDataList.push(recordPreEvaluationData);
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
      url = SystemConstant.PRE_EVALUATION_ADD;
    } else {
      url = SystemConstant.PRE_EVALUATION_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordPreEvaluationRequest).subscribe({
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
