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
  selector: 'app-control-effect-edit',
  templateUrl: './control-effect-edit.component.html',
  styleUrls: ['./control-effect-edit.component.scss']
})
export class ControlEffectEditComponent implements OnInit {
  recordControlEffectEditTitle: string;
  @Input() recordControlEffectRequest = {
    'recordControlEffect': {
      'id': '',
      'preEvaluationNo': '',
      'verificationResult': ''
    },
    'recordControlEffectDataList': [{
      'id': '',
      'preEvaluationId': '',
      'preEvaluationProjectId': '',
      'surveyResults': '',
      'remarks': '',
      'projectName': ''
    }],
    'recordControlEffectProjectList': [{
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
    const preEvaluationId = this.recordControlEffectRequest.recordControlEffect.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.addFlag = true;
      this.recordControlEffectEditTitle = '新增--建设项目概况调查表（控制效果评价） ';
      // 新增时 获取项目列表
      this.httpService.post(SystemConstant.CONTROL_EFFECT_PROJECT_LIST, {} ).subscribe({
        next: (data) => {
          this.recordControlEffectRequest.recordControlEffectDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordControlEffectData = {
              'id': '',
              'preEvaluationId': '',
              'preEvaluationProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].projectName
            };
            this.recordControlEffectRequest.recordControlEffectDataList.push(recordControlEffectData);
          }
        },
        complete: () => {
        }
      });
    } else {
      // 编辑时数据绑定
        this.addFlag = false;
        this.recordControlEffectEditTitle = '修改--建设项目概况调查表（控制效果评价） ';
        // 修改时获取项目列表
        const  dataList = this.recordControlEffectRequest.recordControlEffectDataList;
        this.recordControlEffectRequest.recordControlEffectDataList = [];
        // 项目列表
        const  projectList = this.recordControlEffectRequest.recordControlEffectProjectList;
        for (let i = 0; i < dataList.length; i++) {
          // console.log('projectList:' + projectList[i].id);
          const recordControlEffectData = {
            'id': dataList[i].id,
            'preEvaluationId': dataList[i].preEvaluationId,
            'preEvaluationProjectId': dataList[i].preEvaluationProjectId,
            'surveyResults': dataList[i].surveyResults,
            'remarks': dataList[i].remarks,
            'projectName': projectList[i].projectName
          };
          this.recordControlEffectRequest.recordControlEffectDataList.push(recordControlEffectData);
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
      url = SystemConstant.CONTROL_EFFECT_ADD;
    } else {
      url = SystemConstant.CONTROL_EFFECT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordControlEffectRequest).subscribe({
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
