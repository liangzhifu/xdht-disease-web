import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
@Component({
  selector: 'app-control-effect-edit',
  templateUrl: './control-effect-edit.component.html',
  styleUrls: ['./control-effect-edit.component.scss']
})
export class ControlEffectEditComponent implements OnInit {
  recordControlEffectEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordControlEffect: {
      id: '',
      sceneId: 0,
      preEvaluationNo: '',
      verificationResult: ''
    },
    recordControlEffectDataList: [{
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
    if (this.recordData.recordControlEffect === null
      || this.recordData.recordControlEffect.id === null
      || this.recordData.recordControlEffect.id === '') {
      this.addFlag = true;
      this.recordControlEffectEditTitle = '新增--建设项目概况调查表（控制效果评价） ';
      this.recordData.recordControlEffect = {
        id: '',
        sceneId: this.sceneId,
        preEvaluationNo: '',
        verificationResult: ''
      };
      // 获取项目列表
      this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 2} ).subscribe({
        next: (data) => {
          this.recordData.recordControlEffectDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordControlEffectData = {
              'id': '',
              'preEvaluationId': '',
              'preEvaluationProjectId': data[i].id,
              'surveyResults': '',
              'remarks': '',
              'projectName': data[i].dictionaryName
            };
            this.recordData.recordControlEffectDataList.push(recordControlEffectData);
          }
        },
        complete: () => {
        }
      });
    } else {
      // 编辑时数据绑定
        this.addFlag = false;
        this.recordControlEffectEditTitle = '修改--建设项目概况调查表（控制效果评价） ';
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
      url = SystemConstant.CONTROL_EFFECT_ADD;
    } else {
      url = SystemConstant.CONTROL_EFFECT_EDIT;
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
